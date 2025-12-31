
import { useEffect, useState } from "react";

 function Notify() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/notify.json")
      .then(res => res.json())
      .then(data => {
        setNotifications(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching notifications:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading notifications...</p>;

  return (
    <div className="notifications">
      {notifications.map(item => (
        <div className="notification" key={item.id}>
          <img
            src={item.avatar}
            alt={item.user}
            className="avatar"
          />

          <div className="content">
            <p>
              <strong>{item.user}</strong> {item.action}{" "}
              {item.target && <span className="target">{item.target}</span>}
            </p>

            {item.message && (
              <p className="message">{item.message}</p>
            )}

            <span className="time">{item.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}


export default Notify;