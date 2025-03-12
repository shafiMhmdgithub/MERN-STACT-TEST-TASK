[Start]  
  │  
  ▼  
[Login/Signup Page]  
  ├─ Email ──▶ [Enter Email/Password]  
  │             │  
  │             ▼  
  │         {Is user new?}  
  │             ├─ Yes ──▶ [Create Account in MongoDB]  
  │             │           │  
  │             │           ▼  
  │             │       [Send Verification Email via Nodemailer]  
  │             │           │  
  │             │           ▼  
  │             │       [Generate JWT Token]  
  │             │  
  │             └─ No ──▶ [Validate Password]  
  │                         │  
  │                         ▼  
  │                     [Generate JWT Token]  
  │  
  ├─ Google ──▶ [Custom Google OAuth Flow]  
  │              │  
  │              ▼  
  │          [Fetch Google User Data]  
  │              │  
  │              ▼  
  │          [Create/Update User in MongoDB]  
  │              │  
  │              ▼  
  │          [Generate JWT Token]  
  │  
  └─ Facebook ──▶ [Auth0 Authentication]  
                   │  
                   ▼  
               [Fetch Facebook User Data]  
                   │  
                   ▼  
               [Create/Update User in MongoDB]  
                   │  
                   ▼  
              
