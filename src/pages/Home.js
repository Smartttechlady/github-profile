import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import { FaSun, FaMoon, FaSearch, FaMapMarkerAlt, FaTwitter, FaLink, FaGithub } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css"

function Home() {
  // State variables
  const [darkMode, setDarkMode] = useState(true);
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Toggle Light/Dark Mode
  function toggleMode() {
    setDarkMode(!darkMode);
  }

  // Fetch GitHub User Data
  async function fetchUser() {
    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setUserData(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        setError("Username is not available");
        alert("Username is not available");
        setUserData(null);
      } else {
        const data = await response.json();
        setUserData(data);
      }
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  }


  // Theme mode
  const [themeMode, setThemeMode] = useState("dark");

  const toggleTheme = () => {
    setThemeMode(themeMode === "dark" ? "light" : "dark");
  };

  // Dynamic theme styles
  function getThemeStyles() {
    return {
      backgroundColor: darkMode ? "#141C2F" : "#ffffff",
      color: darkMode ? "#ffffff" : "#000000",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      transition: "background 0.3s, color 0.3s",
    };
  }





  return (
    <div>

      <div style={getThemeStyles()}>
        {/* Header */}
        <Container fluid className="py-3 d-flex justify-content-between align-items-center" style={{ maxWidth: "600px" }}>
          <h4 className="fw-bold">devfinder</h4>
          <Button variant="link" className="text-decoration-none fw-bold" onClick={toggleMode} style={{ color: darkMode ? "#ffffff" : "#000000" }}>
            {darkMode ? "LIGHT" : "DARK"} {darkMode ? <FaSun /> : <FaMoon />}
          </Button>
        </Container>

        {/* Search Section */}
        <Container fluid className="p-3 rounded d-flex align-items-center" style={{
          backgroundColor: darkMode ? "#1F2A48" : "#FFFFFF", color: darkMode ? "#ffffff" : "#000000",
          maxWidth: "600px", boxShadow: darkMode ? "none" : "0px 4px 15px rgba(0, 0, 0, 0.1)",
        }}>
          <FaSearch style={{ color: "#3A7EEC" }} />

          {/* Search Input */}
          <Form.Control
            type="text"
            placeholder="Search GitHub username"
            className={`flex-grow-1 bg-transparent border-0 ${darkMode ? "input-dark text-white" : "input-light text-dark"}`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Button variant="link" className="text-decoration-none fw-bold" onClick={toggleTheme} style={{ color: darkMode ? "#ffffff" : "#000000" }}></Button>

          <Button variant="primary" onClick={fetchUser} disabled={loading} >
            {loading ? <Spinner animation="border" size="sm" /> : "Search"}
          </Button>
        </Container>

        {/* Display Error Message */}
        {error && <p className="text-danger mt-3">{error}</p>}


        {/* Show Loading Spinner */}
        {loading && (
          <Spinner animation="border" className="mt-3" variant={darkMode ? "light" : "dark"} />
        )}

        {userData && (
          <Container
            className="p-4 mt-4 rounded"
            style={{
              backgroundColor: darkMode ? "#1F2A48" : "#FFFFFF",
              color: darkMode ? "#ffffff" : "#000000",
              maxWidth: "600px",
              width: "100%",
              boxShadow: darkMode ? "none" : "0px 4px 15px rgba(0, 0, 0, 0.1)",
            }}
          >

            {/* Profile Section */}
            <Row className="align-items-center  ">
              <Col xs={3} className="text-center">
                <img src={userData.avatar_url} alt="Profile" className="rounded-circle img-fluid" />
              </Col>
              <Col xs={9}>
                {/* Name, Joined Date & User */}
                <div className="d-flex flex-column flex-md-row align-items-md-center profile-header">
                  <h5 className="fw-bold profile-name text-start">{userData.name || "No Name"}</h5>
                  <small className="text-start text-md-end ms-md-auto">
                    Joined {new Date(userData.created_at).toLocaleDateString()}
                  </small>
                </div>
                <p className="username text-start" style={{ color: "#3A7EEC" }}>
                  @{userData.login}
                </p>
              </Col>
            </Row>

            {/* Bio */}
            <p className="mt-2 bio " style={{ marginLeft: "150px" }}>{userData.bio || "This profile has no bio"}</p>

            {/* Stats Section */}
            <Row className="p-3 mt-3 rounded text-left  stats" style={{ backgroundColor: darkMode ? "#141C2F" : "#F0F0F0", marginLeft: "150px" }}>
              <Col>
                <p>Repos</p>
                <h5>{userData.public_repos}</h5>
              </Col>
              <Col>
                <p>Followers</p>
                <h5>{userData.followers}</h5>
              </Col>
              <Col>
                <p>Following</p>
                <h5>{userData.following}</h5>
              </Col>
            </Row>

            {/* Link Section */}
            <Row className="mt-3 link-section" style={{ marginLeft: "140px" }}>
              <Col xs={12} md={6} className="d-flex align-items-center mt-2">
                <FaMapMarkerAlt className="me-2" style={{ color: darkMode ? "#ffffff" : "#000000" }} />{" "}
                <span style={{ opacity: userData.location ? 1 : 0.5 }}>
                  {userData.location || "Not Available"}
                </span>
              </Col>

              <Col xs={12} md={6} className="d-flex align-items-center mt-2">
                <FaTwitter className="me-2" />
                <span style={{ opacity: userData.twitter_username ? 1 : 0.5 }}>
                  {userData.twitter_username ? `@${userData.twitter_username}` : "Not Available"}
                </span>
              </Col>

              <Col xs={12} md={6} className="d-flex align-items-center mt-2">
                <FaLink className="me-2" />
                {userData.blog ? (
                  <a
                    href={userData.blog}
                    className="text-decoration-none text-truncate d-inline-block"
                    style={{
                      color: darkMode ? "#ffffff" : "#000000",
                      maxWidth: "200px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis"
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {userData.blog.replace(/(^\w+:|^)\/\//, '').split('/')[0]}...
                  </a>
                ) : (
                  <span style={{ opacity: 0.5 }}>Not Available</span>
                )}
              </Col>

              <Col xs={12} md={6} className="d-flex align-items-center mt-2">
                <FaGithub className="me-2" />
                <span style={{ opacity: userData.login ? 1 : 0.5 }}>
                  @{userData.login}
                </span>
              </Col>
            </Row>
          </Container>
        )}
      </div>

    </div>
  )
}

export default Home