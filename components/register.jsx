"use client";

import { useState, useEffect } from "react";
import { getRegionsWithChurches, getChurchesByRegion } from "./churches";
import getAvailableEvents from "./events";

export default function RegisterPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showChurchDropdown, setShowChurchDropdown] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    church: "",
    region: "",
    eventId: "",
    eventName: "",
    eventPrice: 0,
    eventType: "",
    paymentMethod: "",
  });

  // Load saved state from localStorage after component mounts
  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window !== "undefined") {
      const savedStep = localStorage.getItem("registrationStep");
      const savedFormData = localStorage.getItem("registrationFormData");
      
      if (savedStep) {
        setCurrentStep(parseInt(savedStep));
      }
      
      if (savedFormData) {
        setFormData(JSON.parse(savedFormData));
      }
    }
  }, []);

  // Save to localStorage whenever formData or currentStep changes
  useEffect(() => {
    if (isMounted && typeof window !== "undefined") {
      localStorage.setItem("registrationFormData", JSON.stringify(formData));
    }
  }, [formData, isMounted]);

  useEffect(() => {
    if (isMounted && typeof window !== "undefined") {
      localStorage.setItem("registrationStep", currentStep.toString());
    }
  }, [currentStep, isMounted]);

  // Get available events (filtered by expiry date)
  const events = getAvailableEvents();

  // Get regions that have churches
  const regions = getRegionsWithChurches();
  
  // Get churches for the selected region
  const availableChurches = formData.region ? getChurchesByRegion(formData.region) : [];

  const totalSteps = formData.eventType === "paid" ? 4 : 3;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEventChange = (e) => {
    const selectedEvent = events.find(event => event.id === parseInt(e.target.value));
    if (selectedEvent) {
      setFormData({
        ...formData,
        eventId: selectedEvent.id,
        eventName: selectedEvent.name,
        eventPrice: selectedEvent.price,
        eventType: selectedEvent.type,
      });
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // If it's a paid event and we're not on the payment step yet, move to payment step
    if (formData.eventType === "paid" && currentStep < 4) {
      nextStep();
      return;
    }
    
    // Final submission (either free event or paid event with payment method selected)
    console.log("Form submitted:", formData);
    // Handle form submission (API call will go here)
    alert("Registration submitted successfully!");
    
    // Clear localStorage after successful submission
    if (typeof window !== "undefined") {
      localStorage.removeItem("registrationFormData");
      localStorage.removeItem("registrationStep");
    }
    
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      church: "",
      region: "",
      eventId: "",
      eventName: "",
      eventPrice: 0,
      eventType: "",
      paymentMethod: "",
    });
    setCurrentStep(1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return formData.church && formData.region;
      case 3:
        return formData.eventId;
      case 4:
        return formData.paymentMethod;
      default:
        return false;
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Event Registration
          </h1>
          <p className="text-gray-600">
            Complete the form below to register for an event
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].slice(0, totalSteps).map((step) => (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all shadow-md ${
                      currentStep >= step
                        ? "bg-[#1E4E9A] text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step}
                  </div>
                  <span className="text-xs mt-2 text-gray-700 font-medium hidden sm:block">
                    {step === 1 && "Personal"}
                    {step === 2 && "Church"}
                    {step === 3 && "Event"}
                    {step === 4 && "Payment"}
                  </span>
                </div>
                {step < totalSteps && (
                  <div className="flex items-center mx-3">
                    <svg
                      className={`w-6 h-6 transition-all ${
                        currentStep > step ? "text-[#1E4E9A]" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Personal Information
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E4E9A] focus:border-transparent"
                      placeholder="Enter your first name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E4E9A] focus:border-transparent"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E4E9A] focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E4E9A] focus:border-transparent"
                    placeholder="+254 712 345 678"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Church Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Church Information
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Region *
                  </label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={(e) => {
                      setFormData({ ...formData, region: e.target.value, church: "" });
                    }}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E4E9A] focus:border-transparent"
                  >
                    <option value="">Select your region</option>
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.region && (
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Church Name *
                    </label>
                    <input
                      type="text"
                      name="church"
                      value={formData.church}
                      onChange={(e) => {
                        setFormData({ ...formData, church: e.target.value });
                        setShowChurchDropdown(true);
                      }}
                      onFocus={() => setShowChurchDropdown(true)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E4E9A] focus:border-transparent"
                      placeholder="Search or enter your church name"
                      autoComplete="off"
                    />
                    
                    {/* Searchable Dropdown */}
                    {showChurchDropdown && availableChurches.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {availableChurches
                          .filter((church) =>
                            church.toLowerCase().includes(formData.church.toLowerCase())
                          )
                          .map((church, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                setFormData({ ...formData, church });
                                setShowChurchDropdown(false);
                              }}
                              className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                            >
                              {church}
                            </div>
                          ))}
                        {availableChurches.filter((church) =>
                          church.toLowerCase().includes(formData.church.toLowerCase())
                        ).length === 0 && formData.church && (
                          <div className="px-4 py-3 text-gray-500 text-sm">
                            No churches found. You can still enter your church name manually.
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Click outside to close dropdown */}
                    {showChurchDropdown && (
                      <div
                        className="fixed inset-0 z-0"
                        onClick={() => setShowChurchDropdown(false)}
                      />
                    )}
                  </div>
                )}

                {!formData.region && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-gray-600">
                      Please select your region first to see available churches.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Event Selection */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Event Details
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Event *
                  </label>
                  <select
                    name="eventId"
                    value={formData.eventId}
                    onChange={handleEventChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E4E9A] focus:border-transparent"
                  >
                    <option value="">Choose an event</option>
                    {events.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.name} - {event.type === "free" ? "Free" : `KSh ${event.price.toLocaleString()}`}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.eventId && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {formData.eventName}
                    </h3>
                    <p className="text-gray-700">
                      <span className="font-medium">Registration Fee:</span>{" "}
                      {formData.eventType === "free" ? (
                        <span className="text-green-600 font-semibold">Free Event</span>
                      ) : (
                        <span className="text-[#E02020] font-semibold">
                          KSh {formData.eventPrice.toLocaleString()}
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Payment Method (Only for paid events) */}
            {currentStep === 4 && formData.eventType === "paid" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Payment Method
                </h2>

                <div className="space-y-4">
                  {/* M-PESA Option */}
                  <div
                    onClick={() => setFormData({ ...formData, paymentMethod: "mpesa" })}
                    className={`cursor-pointer p-6 rounded-lg border-2 transition-all ${
                      formData.paymentMethod === "mpesa"
                        ? "border-[#00A651] bg-green-50 shadow-lg"
                        : "border-gray-200 bg-white hover:border-[#00A651] hover:bg-green-50"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-[#00A651] rounded-full flex items-center justify-center shadow-md">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg">M-PESA</h3>
                        <p className="text-sm text-gray-600">Pay with M-PESA STK Push</p>
                        <p className="text-xs text-[#00A651] font-medium mt-1">Safaricom Mobile Money</p>
                      </div>
                      <div className={`w-7 h-7 rounded-full border-2 ${
                        formData.paymentMethod === "mpesa"
                          ? "border-[#00A651] bg-[#00A651]"
                          : "border-gray-300"
                      } flex items-center justify-center`}>
                        {formData.paymentMethod === "mpesa" && (
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stripe Option */}
                  <div
                    onClick={() => setFormData({ ...formData, paymentMethod: "stripe" })}
                    className={`cursor-pointer p-6 rounded-lg border-2 transition-all ${
                      formData.paymentMethod === "stripe"
                        ? "border-[#635BFF] bg-purple-50 shadow-lg"
                        : "border-gray-200 bg-white hover:border-[#635BFF] hover:bg-purple-50"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-[#635BFF] rounded-full flex items-center justify-center shadow-md">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg">Credit/Debit Card</h3>
                        <p className="text-sm text-gray-600">Pay with Visa, Mastercard, Amex</p>
                        <p className="text-xs text-[#635BFF] font-medium mt-1">Powered by Stripe</p>
                      </div>
                      <div className={`w-7 h-7 rounded-full border-2 ${
                        formData.paymentMethod === "stripe"
                          ? "border-[#635BFF] bg-[#635BFF]"
                          : "border-gray-300"
                      } flex items-center justify-center`}>
                        {formData.paymentMethod === "stripe" && (
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Amount to Pay:</span> KSh {formData.eventPrice.toLocaleString()}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
                  currentStep === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Previous
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className={`w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
                    isStepValid()
                      ? "bg-[#1E4E9A] text-white hover:bg-[#163E7A]"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isStepValid()}
                  className={`w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
                    isStepValid()
                      ? "bg-[#1E4E9A] text-white hover:bg-[#163E7A]"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {formData.eventType === "paid" ? "Proceed to Payment" : "Complete Registration"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
