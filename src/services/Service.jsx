import  axios  from "axios"

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
const Api_Key = import.meta.env.VITE_GROQ_API_KEY

async function Service(codeSnipppet,review=null,question=null) {
    try {

    const isFollowup = question && question.trim()
    const messages = isFollowup ? [
        {
            role:"system",
            content:`You are an expert code review assistant.
                    The user has already received a code review.
                    Use the original code and existing review as context.
                    Answer the user's follow-up question clearly and concisely.
                    Do not generate a new review unless the user explicitly asks for one.
                    Do not return JSON. Return a normal helpful answer.`
        },
        {
            role:"user",
            content:`
            Original code: ${codeSnipppet}
            Review:${JSON.stringify(review)}
            Question:${question}
            `
        }
    ] : [
        {
            role: "system",
            content: `You are an expert Senior Software Engineer and Code Reviewer.
                  Analyze the user's code snippet thoroughly.
                  Respond ONLY in this JSON format, nothing else, no extra text:
                {
                 "bugs": <number>,
                 "warnings": <number>,
                 "tips": <number>,
                 "details": {
                 "bugs_and_flaws": "your detailed bugs review here",
                 "security_issues": "your detailed security review here", 
                 "performance": "your detailed performance review here",
                 "refactored_code": "provide the complete refactored code, properly formatted with correct indentation, comments where needed, and best practices applied"
                }
               }
               Do not write anything outside the JSON.
              Keep your feedback concise, professional, and clear.`
        },
        {
            role: "user",
            content: `Review this code:\n\n\`\`\`\n${codeSnipppet}\n\`\`\``
        },
      ]


      const response = await axios.post(
      GROQ_API_URL,
        {
            model: "openai/gpt-oss-120b", 
            messages, 
            temperature: 0.2
        },
        {
            headers: {
             "Authorization": `Bearer ${Api_Key}`,
             "Content-Type": "application/json",
            },
        }
        )

     const raw = response.data.choices?.[0]?.message?.content || "No feedback received"

     if(isFollowup){
      return raw
     }

     const cleaned = raw.replace(/```json|```/g, "").trim()
     const parsed = JSON.parse(cleaned)
     return parsed

    } catch (error) {
        console.error("Axios Groq API Error:", error.response?.data || error.message)       
    }
}

export default Service