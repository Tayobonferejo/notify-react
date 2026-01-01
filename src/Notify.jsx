
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

  const markAsRead = id => {
    setNotifications(prev =>
      prev.map(item =>
        item.id === id ? { ...item, read: true } : item
      )
    );
    };

  const markAllAsRead = () => {
  setNotifications(prev =>
    prev.map(item => ({ ...item, read: true }))
  );
};



  return (
    <div className="notifications-card">
      <div className="header">
        <h2>
          Notifications <span className="badge">
          {notifications.filter(n => !n.read).length}
        </span>

        </h2>
        <button className="mark-read" onClick={markAllAsRead}>
          Mark all as read
        </button>

      </div>

      {notifications.map(item => (
          <div
            key={item.id}
            className={`notification ${!item.read ? "unread" : ""}`}
            onClick={() => markAsRead(item.id)}
          >
          <img src={item.avatar} alt={item.user} className="avatar" />

          <div className="content">
            <p className="text">
              <strong>{item.user}</strong> {item.action}{" "}
              {item.target && <span className="target">{item.target}</span>}
              {!item.read && <span className="dot"></span>}
            </p>

            <span className="time">{item.time}</span>

            {item.message && (
              <div className="message-box">{item.message}</div>
            )}
          </div>

          {item.image && (
            <img src={item.image} alt="preview" className="preview" />
          )}
        </div>
      ))}
    </div>

  );
}

export default Notify;