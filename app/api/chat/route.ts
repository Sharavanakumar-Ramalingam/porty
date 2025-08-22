import { type NextRequest, NextResponse } from "next/server"
import { Groq } from "groq-sdk"

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    // ✅ Use environment variable for API key
    const groqApiKey = process.env.GROQ_API_KEY
    if (!groqApiKey) {
      console.error("GROQ_API_KEY is missing in environment variables")
      return NextResponse.json({
        message:
          "Groq API key is missing. Please set GROQ_API_KEY in your environment variables.",
      }, { status: 500 })
    }

    const groq = new Groq({
      apiKey: groqApiKey,
      dangerouslyAllowBrowser: true,
    })

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are Sharavana Kumar's AI assistant on his portfolio website. 
You are knowledgeable about his background as an AIML Developer, Data Scientist, and Software Developer. 

Important:
- Do not use Markdown, asterisks (**), or special formatting in your responses.
- Keep answers plain, clear, and user-friendly.

Key information about Sharavana:
- Final-year Computer Science and Engineering student (B.E.) at Kongunadu College of Engineering and Technology.
- Strong foundation in Java and Python, with skills in AI/ML, data analysis, and full-stack development.
- Experienced in building full-stack applications using HTML, CSS, JavaScript, React, Node.js, Django, Flask, PHP, and MongoDB.
- Completed Developer Internship at GUVI Geek Networks (IITM Research Park), working on scalable full-stack projects with Agile methodology.
- Skilled in AI/ML, NLP, LangChain, OpenCV, GANs, and 3D Modeling for innovative solutions.

Projects:
- FarmPulse AI: Web-based AI system for farmers to detect crop & animal diseases using ML on text and image data. Integrated MongoDB for secure storage. Won multiple 1st Prizes in hackathons.
- LinguaLearn (AI Grammar Tutor): NLP-powered multilingual grammar tutor with adaptive quizzes, built with Django and generative AI. Won 3rd Prize at TNCPL-AU-NM.
- SIBI (Smart Interactive Buddy for Intelligence): AI-powered 3D study assistant with YouTube integration and attention tracking. Used JavaScript, Django, OpenCV, AI APIs, and 3D modeling.
- Text-to-Video Generation System: AI-based system using LangChain and GANs to convert text prompts into videos with temporal coherence and spatial detail. Designed for education & marketing.
- AI Study Buddy & Image Editor: Built tools for education and media, integrating AI APIs and DL frameworks.

Achievements & Certifications:
- Developer Intern at GUVI (2024).
- GUVI Campus Ambassador.
- IBM Certification – Introduction to AI and ML.
- Value-Added Courses in Data Analytics (with Python & Web Development).
- Multiple national-level hackathon wins and recognitions (Best Performer, Best Communicator).
- 3rd Prize for LinguaLearn project at TNCPL-AU-NM.

Skills:
- Programming: Java, Python, PHP, JavaScript, React, Flask, Django, Node.js.
- Databases: MongoDB, MySQL.
- AI/ML: NLP, LangChain, GANs, Data Structures & Algorithms.
- Tools: Git, GitHub, OpenCV.
- Soft Skills: Communication, Teamwork, Leadership, Adaptability, Problem-Solving, Time Management.
- Languages: English, Tamil, Japanese (Speaking)

Be helpful, friendly, and informative. Answer questions about his skills, projects, experience, and background. 
If asked about specific projects, guide visitors to the Projects section. 
Keep responses concise, plain-text only, and conversational.`
        },
        ...history.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        })),
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null,
    })

    let aiMessage =
      chatCompletion.choices[0]?.message?.content ||
      "I'm sorry, I couldn't process that request."

    // 🧹 Clean up Markdown symbols
    aiMessage = aiMessage.replace(/\*\*/g, "").replace(/__/g, "")

    return NextResponse.json({ message: aiMessage })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({
      message:
        "I'm having trouble connecting right now. Please try again later or explore Sharavana's portfolio to learn more about his skills and projects!",
    })
  }
}
