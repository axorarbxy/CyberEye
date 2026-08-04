import {useState} from "react";

function checkStrength(password) {
  let score = 0;
  const feedback = [];

  if (password.length >= 8) score++;
  else feedback.push("USe at least 8 characters");

  if (password.length >= 12) score++;

  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  else feedback.push("Mix uppercase and lowercase letters");

  if(/\d/.test(password)) score++;
  else feedback.push("Include at least one number");

  if (/[^A-Za-z0-9]/.test(password)) score++;
  else feedback.push("Include a special character (!@#$...)");

  const commonPatterns = ["password","123456","qwerty","letmein","admin"];
  if (commonPatterns.some((p) => password.toLowerCase().includes(p))) {
    score = Math.max(0, score-2);
    feedback.push("Avoid common words/patterns");
  }

  let label = "Very Weak";
  let color = "#e74c3c";
  if (score >= 5) { label = "Very Strong"; color = "#27ae60"; }
  else if (score ===4) { label = "Strong"; color = "#2ecc71"; }
  else if (score == 3) {label = "Moderate"; color = "#f39c12"; }
  else if (score == 2) { label = "Weak"; color = "#e67e22"; }

  return { score, label, color, feedback };
}

function PasswordChecker() {
  const [password, setPassword] = useState("");
  const result = password ? checkStrength(password) : null;

  return {
    <div style = {{ padding:"24px", maxWidth:"500px"; margin:"0 auto" }}>
      <h1>Password Strength Checker</h1>
      <p>Check how strong your password is before using it.</p>

      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Type a password to check"
        style={{width: "100%", padding:"10px", fontSize:"14px", marginTop:"16px"}}
      />

      {result && (
        <div style={{marginTop:"20px" }}>
          <div style={{
            height:"10px",
            borderRadius:"5px",
            backgrouncColor: "#eee",
            overflow: "hidden",
            marginBottom: "10px"
          }}>
            <div style={{
              height:"100%",
              width: '${(result.score / 5) * 100}% ',
              backgroundColor: result.color,
              transition: "width 0.3s"
            }}/>
          </div>

          <p style={{ fontWeight:"bold",color:result.color}}>
            {result.label}
          </p>

          {result.feedback.length > 0 && (
            <ul style={{ marginTop:"10px",paddingLeft:"20px"}}>
              {result.feedback.map((f,i) => (
                <li key={i} style={{ fontSize:"13px",color:"#666"}}>{f}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default PasswordChecker;
      
