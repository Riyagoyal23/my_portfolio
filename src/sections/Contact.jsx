// Importing React's useState hook for managing component state
import { useState } from "react";

// Importing motion component from Framer Motion for animations
import { motion } from "framer-motion";

// Importing EmailJS SDK
import emailjs from "@emailjs/browser";

// Importing Particles Background (same as Home component)
import ParticlesBackground from "../components/ParticlesBackground.jsx";

// Importing the contact image asset
import Astra from "../assets/Astra.png";

// Reading EmailJS credentials from environment variables (Vite)
const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

console.log("SERVICE:", SERVICE_ID);
console.log("TEMPLATE:", TEMPLATE_ID);
console.log("PUBLIC:", PUBLIC_KEY);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));

    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const required = ["name", "email" , "message"];
    const newErrors = {};

    required.forEach(
      (f) => !formData[f].trim() && (newErrors[f] = "Fill this field")
    );
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...formData,
          from_name: formData.name,
          reply_to: formData.email,
        },
        PUBLIC_KEY
      );

      setStatus("success");
   setFormData({
  name: "",
  email: "",
  message: "",
}); 
    } catch (err) {
  console.error("EmailJS Error:", err);

  alert(
    JSON.stringify(err, null, 2)
  );

  setStatus("error");
}
  };

  return (
    <section
      id="contact" className="w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10">
      {/* Particles Background */}
      <ParticlesBackground />

  

      {/* Contact Section Content */}
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-10">
        {/* Left Animated Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <motion.img
            src={Astra}
            alt="Contact"
            className="w-72 md:w-140 rounded-2xl shadow-lg object-cover"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Right Side Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10"
        >
          <h2 className="text-3xl font-bold mb-3">
  Let's Connect
</h2>

<p className="text-gray-300 mb-6">
  I'm actively seeking Software Development and Full Stack Development opportunities. Feel free to reach out regarding internships, full-time roles, collaborations, or networking.
</p>
<div className="mb-6 text-gray-300 space-y-2">
  <p>📧 <a
      href="mailto:goyalriyaa22@gmail.com"
      className="hover:text-[#1CD8D2] transition"
    >
      goyalriyaa22@gmail.com
    </a>
  </p>

  <p>💼 <a
      href="https://www.linkedin.com/in/riya-goyal-51b7a32bb/"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-[#1CD8D2] transition"
    >
      LinkedIn Profile
    </a>
  </p>

  <p>💻 <a
      href="https://github.com/Riyagoyal23"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-[#1CD8D2] transition"
    >
      GitHub Profile
    </a>
  </p>
</div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Name field */}
            <div className="flex flex-col">
              <label className="mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${
                  errors.name ? "border-red-500" : "border-gray-500"
                } text-white focus:outline-none focus:border-blue-500`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

            {/* Email field */}
            <div className="flex flex-col">
              <label className="mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${
                  errors.email ? "border-red-500" : "border-gray-500"
                } text-white focus:outline-none focus:border-blue-500`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>
 
            {/* Message field */}
<div className="flex flex-col">
  <label className="mb-1">
    Message <span className="text-red-500">*</span>
  </label>

  <textarea
  name="message"
  rows={5}
  placeholder="Write your message..."
  value={formData.message}
  onChange={handleChange}
    className={`p-3 rounded-md bg-white/10 border ${
      errors.message ? "border-red-500" : "border-gray-500"
    } text-white focus:outline-none focus:border-blue-500`}
  />

  {errors.message && (
    <p className="text-red-500 text-xs">{errors.message}</p>
  )}
</div>


            

            {/* Status message */}
            {status && (
              <p
                className={`text-sm ${
                  status === "success"
                    ? "text-green-400"
                    : status === "error"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >
                {status === "sending"
                  ? "Sending..."
                  : status === "success"
                  ? "Thank you! Your message has been sent successfully. ✅"
                  : "Something went wrong. ❌"}
              </p>
            )}

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={status === "sending"}
              type="submit"
              className="
  bg-gradient-to-r
  from-[#1CD8D2]
  via-[#00bf8f]
  to-[#302b63]
  hover:opacity-90
  disabled:opacity-60
  text-white
  py-3
  rounded-md
  font-semibold
  transition
"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
