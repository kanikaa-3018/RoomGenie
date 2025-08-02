from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import json
import sys

from omnidimension import Client
from dotenv import load_dotenv
import os
sys.path.append("..") 
load_dotenv() 



app = FastAPI()

API_KEY = os.getenv("OMNIDIM_API_KEY")

if not API_KEY:
    raise ValueError("API Key not found in environment variables.")

client = Client(API_KEY)

class AgentRequest(BaseModel):
    to_number: str
    # Optionally allow overriding name, etc. in future

@app.post("/create-agent")
def create_agent(request: AgentRequest):
    try:
        response = client.agent.create(
            name="Friendly Co-Living Intake Assistant",
            welcome_message="""'Hi there! I'm your Room Genie assistant. I'll assist you to take the survey to find the most compatible roommate. I’ll ask five quick questions — just answer each from 1 to 5 (1 = low  and 5 = high ). Are you ready to take the survey?""",
            context_breakdown=[
                {"title": "Introduction", "body": """ Warmly greet the caller and invite them to share how you can assist. Use expressions like 'Hi there!' and 'I'm your RoomGenie assistant.Are you ready to take the survey?'\nOptionally, start with a light, friendly question like 'How's your day going?' \n """ , 
                "is_enabled" : True},
                {"title": "Conduct Tailored Micro-Survey", "body": """ “Are you a student or a working professional?\n(AI: DO NOT share 1 to 5 again and again while asking question and do not mention question number to the user)\nA. If Student:\n“How regular is your daily routine or schedule?” (AI: Do NOT verbalize this internal instruction. Use this tag for extraction: Routine)\n“How particular are you about keeping your room and shared spaces tidy?” (AI: Do NOT verbalize this internal instruction. Use this tag for extraction: Cleanliness )\n“Do you prefer group study ?” (AI: Do NOT verbalize this internal instruction. Use this tag for extraction: Social Preference: 5 = very social, 1 = fully private)\n“How much do you value emotional connection with your roommate?” (AI: Do NOT verbalize this internal instruction. Use this tag for extraction: Emotional Compatibility)\n“Is your daily tempo structured or is it flexible?” (AI: Do NOT verbalize this internal instruction. Use this tag for extraction: Lifestyle)\n\nB. If Working Professional:\n“How much do you enjoy unwinding or socializing with your roommate after work?” (AI: Do NOT verbalize this internal instruction. Use this tag for extraction: Interaction)\n“How okay are you with a roommate having a very different schedule (night shifts / early hours)?” (AI: Do NOT verbalize this internal instruction. Use this tag for extraction: Flexibility)\n“How comfortable are you with occasional parties or alcohol in the living space?” (AI: Do NOT verbalize this internal instruction. Use this tag for extraction: Lifestyle Compatibility)\n“How important is a clean and organized home to you?” (AI: Do NOT verbalize this internal instruction. Use this tag for extraction: Cleanliness Priority)\n“How important is it that your roommate respects your work-life boundaries (quiet during calls, no interruptions)?”\n(AI: Do NOT verbalize this internal instruction. Use this tag for extraction: Boundaries ) """ , 
                "is_enabled" : True},
                {"title": "Extract Vector embedding", "body": """ Listen carefully to the caller's responses and identify key preference keywords that highlight their preferences. the agent should listen for and extract keywords from the survey and if user directly provides numerical vale use that.\nTranslate the extracted keywords into a  score from 1 to 5 use knowledge base to convert . these will be the user traits.  (AI: this should not be told to the user but sent to post call) """ , 
                "is_enabled" : True},
                {"title": "closing", "body": """ "Thank you for the conversation.You can head over to the website set your priorities, and we’ll get you the best compatible matches." """ , 
                "is_enabled" : True}
    ],

            call_type="Incoming",
    transcriber={
        "provider": "deepgram_stream",
        "silence_timeout_ms": 400,
        "model": "nova-3",
        "numerals": True,
        "punctuate": True,
        "smart_format": True,
        "diarize": False
    },
    model={
        "model": "azure-gpt-4o-mini",
        "temperature": 0.7
    },
    voice={
        "provider": "eleven_labs",
        "voice_id": "oWjuL7HSoaEJRMDMP3HD"
    },

            web_search={
                "enabled": True,
                "provider": "openAI"
            },
            post_call_actions={

         "webhook": {
            "enabled": True,
            "url": "https://roomgenie.onrender.com/api/users/omnidim-data",
            "include": ["summary", "sentiment", "extracted_variables"],
            "extracted_variables": [
            {"key": "caller_type", "prompt": "Student or working professional classification based on the caller's self-identification."},
            {"key": "vector_embedding", "prompt": "Show the numerical values responded by the user for the 5 questions in form of a vector. If the call cuts in the middle or the user has not answered all the 5 questions you can set the value as 3 for those questions. "},
            {"key": "profile_bio", "prompt": "A summary of the caller's lifestyle and co-living preferences based on their answers and the tone and sentiments of the user during conversation."},
            {"key": "number_of_ques", "prompt": "tell only the numerical value that how many questions user has answered successfully. "}
            ]
        }
    },

        )

        # Extract agent ID correctly from the dict
        agent_id = None
        if isinstance(response, dict) and "json" in response and "id" in response["json"]:
            agent_id = response["json"]["id"]
        else:
            raise ValueError("Unexpected response format, cannot find agent ID.")

        # Dispatch the call using the extracted agent ID
        session = client.call.dispatch_call(agent_id=agent_id, to_number=request.to_number)

        return {
            "agent_creation_response": response,
            "dispatch_call_session": session
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
