import React, { useEffect } from "react";
import { useTodoContext } from "../context/TodoContext";
import { useNavigate } from "react-router-dom";

const MyListsPage = () => {
  const { user, todoLists } = useTodoContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirect to home page if not logged in
    }
  }, [user, navigate]);

  const userLists = user
    ? todoLists.filter((list) => list.createdBy === user.email)
    : [];

  const handleEditList = (listId) => {
    navigate(`/create-list/${listId}`);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Your Created Lists</h1>
      {!userLists.length ? (
        <p className="text-center text-gray-500">You haven't created any lists yet.</p>
      ) : (
       <ul>
  {userLists.map((list) => (
    <li
  key={list.id} // Use list.id directly
  className="p-4 mb-4 bg-gray-100 rounded-md shadow-md cursor-pointer"
  onClick={() => handleEditList(list.id)}
>
  <h2 className="text-2xl font-bold">{list.title}</h2>
  <ul>
    {list.items.map((item) => (
      <li key={item.id} className="flex items-center mt-2">
        <input type="checkbox" checked={item.checked} readOnly className="mr-4" />
        <span>{item.name}</span>
      </li>
    ))}
  </ul>
</li>

  ))}
</ul>

      )}
    </div>
  );
};

export default MyListsPage;
