import { useEffect, useState } from "react";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data);
      });
  }, []);

  useEffect(() => {
    let filtered = posts;
    if (searchQuery) {
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedUserId) {
      filtered = filtered.filter((post) => post.userId === Number(selectedUserId));
    }
    setFilteredPosts(filtered);
  }, [searchQuery, selectedUserId, posts]);

  const handleSort = (field) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
    const sorted = [...filteredPosts].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredPosts(sorted);
  };

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title"
          className="p-2 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          onChange={(e) => setSelectedUserId(e.target.value)}
          value={selectedUserId}
        >
          <option value="">Filter by User ID</option>
          {[...new Set(posts.map((post) => post.userId))].map((id) => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>
        <button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={() => handleSort("title")}
        >
          Sort by Title ({sortOrder})
        </button>
        <button
          className="p-2 bg-green-500 text-white rounded"
          onClick={() => handleSort("userId")}
        >
          Sort by User ID ({sortOrder})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-bold">{post.title}</h2>
            <p className="text-gray-700">{post.body}</p>
            <p className="text-sm text-gray-500">User ID: {post.userId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
