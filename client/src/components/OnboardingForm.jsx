import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .min(10, "Phone must be at least 10 digits"),
  age: yup.string().required("Age is required"),
  budget: yup.string().required("Budget is required"),
  location: yup
    .string()
    .required("Location is required")
    .min(3, "Location must be at least 3 characters"),
});

const steps = [
  {
    title: "Personal Information",
    fields: ["name", "email"],
    icon: User,
  },
  {
    title: "Contact & Demographics",
    fields: ["phone", "age"],
    icon: Phone,
  },
  {
    title: "Preferences",
    fields: ["budget", "location"],
    icon: MapPin,
  },
];

const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const isMountedRef = useRef(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const validateCurrentStep = () => {
    const step = steps[currentStep];
    const missing = step.fields.some((f) => {
      const val = getValues(f);
      return val === undefined || val === "" || val === null;
    });
    const hasError = step.fields.some((f) => !!errors[f]);
    if (missing || hasError) {
      toast.error("Please fill in all required fields correctly");
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (!validateCurrentStep()) return;
    if (currentStep < steps.length - 1) setCurrentStep((s) => s + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const onSubmit = async (data) => {
    if (submitting) return;
    setSubmitting(true);

    // Format the phone number
    let formattedPhone = data?.phone?.trim();
    if (!formattedPhone.startsWith("+91")) {
      formattedPhone =
        "+91" + formattedPhone.replace(/^0+/, "").replace(/\D/g, "");
    }

    const payload = { ...data, phone: formattedPhone };

    try {
      const response = await fetch(
        "https://c3fa96c76aba.ngrok-free.app/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Registration failed");
      }

      toast.success("Profile created successfully!");

      timeoutRef.current = window.setTimeout(() => {
        if (!isMountedRef.current) return;
        toast.success("Our AI assistant will call you soon! 💬", {
          duration: 3000,
        });
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("submit error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      if (isMountedRef.current) setSubmitting(false);
    }
  };

  const renderField = (
    fieldName,
    placeholder,
    type = "text",
    IconComponent
  ) => (
    <div className="relative">
      <IconComponent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-darkGray" />
      <input
        type={type}
        placeholder={placeholder}
        {...register(fieldName)}
        className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-#008080 focus:border-transparent transition-all text-lg"
        disabled={submitting}
      />
      {errors[fieldName] && (
        <p className="text-contrast text-sm mt-2 ml-1">
          {errors[fieldName]?.message}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-12 px-4 font-[Poppins]">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Tell Us About Yourself
          </h1>
          <p className="text-xl text-gray-700">
            Help us find your perfect roommate match
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 ${
                  index <= currentStep ? "text-[#B38FB5]" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    index <= currentStep
                      ? "border-[#B38FB5] bg-[#B38FB5] text-white"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <span className="font-medium hidden sm:block">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div
              style={{
                background: "linear-gradient(to right, #B38FB5, #000000)",
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
              className="h-2 rounded-full transition-all duration-500"
            />
          </div>
        </div>

        {/* Form Container */}
        <motion.div
          className="bg-white rounded-3xl p-8 shadow-2xl border border-[#B38FB5]/10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-8">
              {/* Step 1 */}
              {currentStep === 0 && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-black mb-6">
                    Personal Information
                  </h2>
                  {renderField("name", "Full Name", "text", User)}
                  {renderField("email", "Email Address", "email", Mail)}
                </motion.div>
              )}

              {/* Step 2 */}
              {currentStep === 1 && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-black mb-6">
                    Contact & Demographics
                  </h2>
                  {renderField("phone", "Phone Number", "tel", Phone)}

                  {/* Age Input */}
                  <div className="mb-5">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                      <input
                        type="number"
                        id="age"
                        {...register("age", {
                          required: "Age is required",
                          valueAsNumber: true,
                          min: { value: 16, message: "Must be at least 16" },
                          max: { value: 99, message: "Age too high" },
                        })}
                        placeholder="e.g., 21"
                        className={`w-full pl-10 pr-4 py-2 border ${
                          errors.age ? "border-red-500" : "border-gray-300"
                        } rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                          errors.age
                            ? "focus:ring-red-500"
                            : "focus:ring-[#B38FB5]"
                        } text-black placeholder-gray-400`}
                      />
                    </div>
                    {errors.age && (
                      <p className="text-red-500 text-sm mt-1 ml-1">
                        {errors.age.message}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 3 */}
              {currentStep === 2 && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-black mb-6">
                    Your Preferences
                  </h2>

                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      {...register("budget")}
                      className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#B38FB5] text-lg bg-white"
                      disabled={submitting}
                    >
                      <option value="">Select Budget Range</option>
                      <option value="₹500-₹800">₹500 - ₹800</option>
                      <option value="₹800-₹1200">₹800 - ₹1,200</option>
                      <option value="₹1200-₹1600">₹1,200 - ₹1,600</option>
                      <option value="₹1600-₹2000">₹1,600 - ₹2,000</option>
                      <option value="₹2000+">₹2,000+</option>
                    </select>
                    {errors.budget && (
                      <p className="text-red-500 text-sm mt-2 ml-1">
                        {errors.budget.message}
                      </p>
                    )}
                  </div>
                  {renderField(
                    "location",
                    "Preferred Location (City, State)",
                    "text",
                    MapPin
                  )}
                </motion.div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12">
              <button
                type="button"
                onClick={prevStep}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  currentStep === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-800 hover:text-[#B38FB5] border border-gray-300 hover:border-[#B38FB5]"
                }`}
                disabled={currentStep === 0 || submitting}
              >
                Previous
              </button>

              {currentStep === steps.length - 1 ? (
                <motion.button
                  type="submit"
                  disabled={submitting}
                  className="text-white bg-[#563f57] px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 disabled:opacity-50"
                  whileHover={{ scale: submitting ? 1 : 1.02 }}
                  whileTap={{ scale: submitting ? 1 : 0.98 }}
                >
                  <span>{submitting ? "Saving..." : "Complete Profile"}</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  disabled={submitting}

                  
                  
                  className="text-white bg-[#563f57] px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 disabled:opacity-50"

                  whileHover={{ scale: submitting ? 1 : 1.02 }}
                  whileTap={{ scale: submitting ? 1 : 0.98 }}
                >
                  <span>Next Step</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardingForm;
