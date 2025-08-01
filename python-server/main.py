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
            name="Roommate Compatibility Assistant",
            welcome_message="""
Hi, I'm the RoomGenie Assistant!  I'm calling to guide you through a quick survey to help us find the perfect roommate match for you by asking just a few questions to understand your lifestyle, preferences, and habits.
Let’s begin! First, could you please tell me your age? That will help me choose the right set of questions for you.
""",
            context_breakdown=[
                {"title": "Agent Role & Context", "body": """ You are a representative of Room Genie calling potential users who have shown interest in finding a compatible roommate. Your goal is to conduct a personalized survey to capture essential details about their preferences, lifestyle, and expectations for a roommate. The data you collect will be used to create accurate roommate matches. Conduct the survey with minimal effort required from the user, adapting the conversation based on their responses. You need to keep the conversation as small as possible and try to get the results quicker. """ , 
                "is_enabled" : True},
                {"title": "Introduction & Purpose", "body": """ \nYou are an AI personality assistant. Your goal is to analyze the user’s answers to lifestyle questions and assign them trait scores (0.00–10.00) based on a defined knowledge base. Focus on key traits such as cleanliness, sociability, conflict tolerance, and lifestyle preferences.\n\nFor each user response:\n-Extract keywords or expressions, especially Gen-Z slang or informal phrasing.\n-Map these keywords to associated categories using the knowledge base (e.g., “messy” → cleanliness score ~2.00).\n\n-Include synonyms or implied meanings (e.g., “vibey” might map to sociability).\n-If the response is out of context or ambiguous, respond with:\n“It seems your response might not relate directly to the question. Could you rephrase or clarify?”\n\n\n\n """ , 
                "is_enabled" : True},
                {"title": "Personalized Lifestyle Questions", "body": """ \n\nQuestions:\nAccording to each age group I am providing you with 5 questions and ask them one by one from the user and wait for the response . When the user answers the question you should  start the next question with "let's move on to the next one!" and then ask the question.\n\nHere is the question list:\n16–18 Years (Teens — High School Compatibility)\n1. Sleep Discipline\nHow strongly do you stick to a fixed sleep schedule?\nTrait: sleepDiscipline\n\n2. Cleanliness\nHow clean and organized do you like your room to be?\nTrait: cleanliness\n\n3. Study Style\nWhere do you stand between self-study and group discussions as a way to learn?\nTrait: studyStyle\n\n4. Emotional Support\n\nHow much do you prefer having an emotionally supportive roommate (someone to talk to)?\n\nTrait: emotionalSupport\n\n5. Stream Compatibility\n\nHow important is it for you to have a roommate from your same stream (e.g., Science/Commerce)?\nTrait: streamAffinity\n\n18–25 Years (College Students)\n1. Cleanliness\nPrompt:\nHow particular are you about keeping your room clean and organized?\nTrait: cleanliness\n\n2. Noise Tolerance\n\nHow much noise (reels/music/chatting/netflix) can you tolerate in your room?\nTrait: noiseTolerance\n\n3. Guest Comfort\n\nHow comfortable are you with a roommate inviting friends to the room?\nTrait: guestComfort\n\n4. Sharing Items\n\nHow willing are you to share personal items like utensils, chargers, etc.?\nTrait: itemSharing\n\n5. Emotional Sharing\n\nHow much do you prefer discussing your feelings or daily experiences with your roommate?\nTrait: emotionalSharing\n\n25+ Years (Working Professionals)\n1. Socializing\n\nHow much do you enjoy socializing with your roommate after work?\nTrait: socialPreference\n\n2. Schedule Flexibility\n\nHow comfortable are you with a roommate having a very different schedule (e.g., night shifts or early work hours)?\nTrait: scheduleTolerance\n\n3. Party/Alcohol Openness\n\nHow comfortable are you with occasional parties or alcohol use in your living space?\nTrait: partyOpenness\n\n4. Cleanliness\n\nHow important is a clean and organized home to you?\nTrait: cleanliness\n\n5. Work-Life Respect\n\nHow important is it for your roommate to respect your work-life balance (e.g., no loud noise during late-night calls)?\nTrait: workLifeRespect\n\n\nTraits Extraction\nYou are an AI personality assistant. Your goal is to analyze the user’s answers to lifestyle questions and assign them trait scores (0.00–10.00) based on a defined knowledge base. Focus on key traits such as cleanliness, sociability, conflict tolerance, and lifestyle preferences.\n\nFor each user response:\n-Extract keywords or expressions, especially Gen-Z slang or informal phrasing.\n-Map these keywords to associated categories using the knowledge base (e.g., “messy” → cleanliness score ~2.00).\n\n-Include synonyms or implied meanings (e.g., “vibey” might map to sociability).\n-If the response is out of context or ambiguous, respond with:\n“It seems your response might not relate directly to the question. Could you rephrase or clarify?”\n Once the user gives the right input you can Move on to the next question.”\n """ , 
                "is_enabled" : True},
                {"title": "Personalization & Responsive Probing", "body": """ Throughout the conversation, respond empathetically and adaptively to their answers: 'I understand. It's important to have a living environment that suits your preferences.' If the user hesitates, gently probe: 'Could you tell me more about that?' Maintain a supportive and attentive tone. """ , 
                "is_enabled" : True},
                {"title": "Closing", "body": """ Thank them for their time and cooperation: 'Thank you for taking the time to speak with me today! Based on your responses, we’ve generated your initial roommate preference profile. If you'd like to fine-tune your matches, please head over to the RoomGenie website to edit your preferences or set priority levels for what matters most to you." """ , 
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
        "voice_id": "N8CqI3qXFmT0tJHnzlrq"
    },

            web_search={
                "enabled": True,
                "provider": "openAI"
            },
            post_call_actions={
                "webhook": {
                    "enabled": True,
                    "url": "https://c3fa96c76aba.ngrok-free.app/api/users/omnidim-data",
                    "include": ["summary", "sentiment", "extracted_variables"],
                    "extracted_variables": [
                        {
                            "key": "personality_embedding",
                            "prompt": """The decimal numbers extracted from each question must be returned in the form of a vector. Here is the demo:\n{\n  \"call_id\": 24877,\n  \"user_email\": \"user@example.com\",\n  \"call_report\": {\n    \"extracted_variables\": {\n      \"traits\": [0.35, 0.89, 0.14, 0.78, 0.62]\n    }\n  }\n}"""
                        }
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
