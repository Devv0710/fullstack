const Filter = ({ searchContact }) => {
  return (
    <div>
      filter shown with:
      <input onChange={searchContact} />
    </div>
  );
};

export default Filter;
