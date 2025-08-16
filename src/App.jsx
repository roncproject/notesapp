import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generate the data client inside the component
  const client = generateClient();

  // Function to fetch notes using the data client
  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the data client to list all notes
      const response = await client.models.Note.list();
      setNotes(response.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError(err.message || "Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={reactLogo} className="logo react" alt="React logo" />
        <h1>Hello from Amplify</h1>
        
        {/* Notes section */}
        <div style={{ marginTop: "2rem", textAlign: "left", maxWidth: "600px" }}>
          <h2>Notes</h2>
          
          {loading && <p>Loading notes...</p>}
          
          {error && (
            <div style={{ color: "red", marginBottom: "1rem" }}>
              Error: {error}
            </div>
          )}
          
          {notes.length === 0 && !loading && !error && (
            <p>No notes found. Create your first note!</p>
          )}
          
          {notes.map((note) => (
            <div key={note.id} style={{ 
              border: "1px solid #ccc", 
              padding: "1rem", 
              margin: "0.5rem 0", 
              borderRadius: "4px",
              backgroundColor: "#f9f9f9"
            }}>
              <h3>{note.name}</h3>
              <p>{note.description}</p>
              {note.image && (
                <img 
                  src={note.image} 
                  alt={note.name} 
                  style={{ maxWidth: "200px", height: "auto" }}
                />
              )}
            </div>
          ))}
          
          <button 
            onClick={fetchNotes} 
            style={{ 
              marginTop: "1rem", 
              padding: "0.5rem 1rem", 
              backgroundColor: "#007bff", 
              color: "white", 
              border: "none", 
              borderRadius: "4px", 
              cursor: "pointer" 
            }}
          >
            Refresh Notes
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;