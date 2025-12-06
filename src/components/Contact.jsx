import React, { useState } from "react";
import { submitContactForm } from "../services/firebase";

const Contact = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setSubmitted(true);
        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setFormData({ name: "", email: "", message: "" });
        }, 2000);
      } else {
        setSubmitted(false);
        setLoading(false);
        setFormData({ name: "", email: "", message: "" });
        alert("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitted(false);
      setLoading(false);
      setFormData({ name: "", email: "", message: "" });
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 130,
        left: 0,
        right: 0,
        bottom: 50,
        // backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(10px)",
          padding: "1rem",
          borderRadius: "1rem",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          width: "100%",
          maxWidth: "28rem",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          position: "relative",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
          <h2
            style={{
              fontSize: "1.875rem",
              fontWeight: "bold",
              color: "#1f2937",
              marginBottom: "0.5rem",
            }}
          >
            Contact Us
          </h2>
          <p style={{ color: "#6b7280", marginTop: "0.5rem" }}>
            We'd love to hear from you!
          </p>
        </div>
        {submitted ? (
          <div style={{ textAlign: "center", color: "#10b981" }}>
            <p>Thank you for your message! We'll get back to you soon.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "0.25rem",
                }}
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{
                  width: "92%",
                  padding: "0.75rem 1rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  outline: "none",
                  transition:
                    "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                }}
                placeholder="Your name"
                required
                onFocus={(e) =>
                  (e.target.style.boxShadow =
                    "0 0 0 3px rgba(59, 130, 246, 0.1)")
                }
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "0.25rem",
                }}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: "92%",
                  padding: "0.75rem 1rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  outline: "none",
                  transition:
                    "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                }}
                placeholder="Your email"
                required
                onFocus={(e) =>
                  (e.target.style.boxShadow =
                    "0 0 0 3px rgba(59, 130, 246, 0.1)")
                }
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "0.25rem",
                }}
              >
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                style={{
                  width: "92%",
                  padding: "0.75rem 1rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  outline: "none",
                  transition:
                    "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                  resize: "none",
                  minHeight: "100px",
                }}
                placeholder="Your message"
                required
                onFocus={(e) =>
                  (e.target.style.boxShadow =
                    "0 0 0 3px rgba(59, 130, 246, 0.1)")
                }
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: "linear-gradient(to right, #207985, #0b1f4bdc)",
                color: "white",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                fontWeight: "600",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.5 : 1,
                transition: "all 0.2s",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
              }}
              className="submit-button"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            color: "#9ca3af",
            fontSize: "1.5rem",
            fontWeight: "300",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
          onMouseOver={(e) => (e.target.style.color = "#6b7280")}
          onMouseOut={(e) => (e.target.style.color = "#9ca3af")}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Contact;
