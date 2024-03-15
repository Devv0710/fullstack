const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return (
    <div className="notification">
      <p>{message}</p>
    </div>
  );
};
export default Notification;
