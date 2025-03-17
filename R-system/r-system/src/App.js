import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState({ field: "title", order: "asc" });
  const [userIds, setUserIds] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      setPosts(res.data);
      setFilteredPosts(res.data);
      const uniqueUserIds = [...new Set(res.data.map((post) => post.userId))];
      setUserIds(uniqueUserIds);
    });
  }, []);

  // Search by title
  useEffect(() => {
    let filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [search, posts]);

  // Sorting function
  const handleSort = (field, order) => {
    const sortedData = [...filteredPosts].sort((a, b) => {
      if (order === "asc") return a[field] > b[field] ? 1 : -1;
      return a[field] < b[field] ? 1 : -1;
    });
    setFilteredPosts(sortedData);
    setSortOrder({ field, order });
  };

  // Filter by userId
  const handleFilterByUser = (userId) => {
    if (userId === "all") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post) => post.userId === Number(userId)));
    }
  };

  return (
    <div className="app-container">
      <h1>Post Manager</h1>

      {/* Filter & Search */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by title..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => handleFilterByUser(e.target.value)}>
          <option value="all">All Users</option>
          {userIds.map((id) => (
            <option key={id} value={id}>
              User {id}
            </option>
          ))}
        </select>

        <button onClick={() => handleSort("title", "asc")}>Sort Title A-Z</button>
        <button onClick={() => handleSort("title", "desc")}>Sort Title Z-A</button>
        <button onClick={() => handleSort("userId", "asc")}>Sort UserID ↑</button>
        <button onClick={() => handleSort("userId", "desc")}>Sort UserID ↓</button>
      </div>

      {/* Posts List */}
      <div className="post-list">
        {filteredPosts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <span>User ID: {post.userId}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
