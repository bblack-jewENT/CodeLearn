import { useState, useEffect } from "react";
import { getPersistedItem, setPersistedItem } from "../services/persist";
import { PayPalButtons } from "@paypal/react-paypal-js";

const Pricing = () => {
  const [subscription, setSubscription] = useState("free");

  useEffect(() => {
    getPersistedItem("subscription", "free").then(setSubscription);
  }, []);

  const handleFreeSubscribe = async () => {
    await setPersistedItem("subscription", "free");
    setSubscription("free");
    alert("Switched to Free plan!");
  };

  const handlePremiumSubscribe = async () => {
    await setPersistedItem("subscription", "premium");
    setSubscription("premium");
    alert("Switched to Premium plan!");
  };

  return (
    <div className="container" style={{ padding: "3rem 0" }}>
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        Choose Your Plan
      </h1>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Free Plan */}
        <div
          className="card"
          style={{
            minWidth: "300px",
            textAlign: "center",
            border:
              subscription === "free" ? "2px solid #207985" : "1px solid #ccc",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Free Plan
          </h2>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#207985" }}>
            $0/month
          </p>
          <ul style={{ textAlign: "left", margin: "1rem 0" }}>
            <li>Access to basic courses</li>
            <li>Interactive quizzes</li>
            <li>Progress tracking</li>
            <li>Community support</li>
          </ul>
          <button
            className="btn"
            onClick={handleFreeSubscribe}
            disabled={subscription === "free"}
            style={{
              background: subscription === "free" ? "#ccc" : "#207985",
              cursor: subscription === "free" ? "not-allowed" : "pointer",
            }}
          >
            {subscription === "free" ? "Current Plan" : "Select Free"}
          </button>
        </div>

        {/* Premium Plan */}
        <div
          className="card"
          style={{
            minWidth: "300px",
            textAlign: "center",
            border:
              subscription === "premium"
                ? "2px solid #207985"
                : "1px solid #ccc",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Premium Plan
          </h2>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#207985" }}>
            $3.82/month
          </p>
          <ul style={{ textAlign: "left", margin: "1rem 0" }}>
            <li>All free features</li>
            <li>Course assignments and projects</li>
            <li>Completion certificates</li>
            <li>Advanced courses</li>
            <li>Priority support</li>
          </ul>
          <div style={{ marginTop: "1rem" }}>
            <div style={{ marginBottom: "0.75rem", fontWeight: 600 }}>
              Pay $3.82 to activate Premium
            </div>
            {subscription === "premium" ? (
              <button className="btn" style={{ background: "#ccc" }} disabled>
                Current Plan
              </button>
            ) : (
              <div>
                <div style={{ marginBottom: "0.75rem" }}>
                  <PayPalButtons
                    style={{ layout: "vertical", color: "blue" }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: "3.82",
                              currency_code: "USD",
                            },
                            description: "CourseCode Premium Subscription",
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      const details = await actions.order.capture();
                      console.log("PayPal transaction completed:", details);
                      await setPersistedItem("subscription", "premium");
                      setSubscription("premium");
                      alert(
                        "Payment successful — you are now a Premium member!"
                      );
                    }}
                    onError={(err) => {
                      console.error("PayPal error:", err);
                      alert("Payment failed. Please try again later.");
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
