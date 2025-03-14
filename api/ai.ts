import React from 'react'
import axios from 'axios';
import { development } from '../config';

interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

interface ChatOptions {
    temperature?: number;
    max_tokens?: number;
    model?: string;
}

// Detailed product information
const PRODUCT_CATALOG = {
    aiPlatform: {
        name: "URI AI Platform",
        pricing: {
            starter: { price: 299, period: "month", features: ["Basic API access", "5 AI models", "100k requests/month"] },
            professional: { price: 999, period: "month", features: ["Advanced API access", "15 AI models", "500k requests/month"] },
            enterprise: { price: 4999, period: "month", features: ["Full API access", "Unlimited models", "Custom requests limit"] }
        },
        technicalSpecs: {
            apiLatency: "< 100ms",
            uptime: "99.99%",
            supportedFrameworks: ["TensorFlow", "PyTorch", "JAX"],
            deploymentOptions: ["Cloud", "On-premise", "Hybrid"]
        },
        useCase: ["Natural Language Processing", "Computer Vision", "Speech Recognition"]
    },
    aiStudio: {
        name: "URI AI Studio",
        pricing: {
            basic: { price: 49, period: "month", features: ["Model training UI", "Basic templates", "Community support"] },
            team: { price: 199, period: "month", features: ["Team collaboration", "Custom templates", "Priority support"] },
            enterprise: { price: 999, period: "month", features: ["Enterprise features", "Custom development", "Dedicated support"] }
        },
        technicalSpecs: {
            supportedDataTypes: ["Text", "Images", "Audio", "Structured Data"],
            modelTypes: ["Classification", "Regression", "Clustering", "Neural Networks"],
            integrations: ["GitHub", "GitLab", "Bitbucket", "AWS", "Azure", "GCP"]
        }
    }
};

// Company information
const COMPANY_INFO = {
    about: `URI AI is a leading artificial intelligence solutions provider founded in 2020.
    We specialize in making AI technology accessible and practical for businesses of all sizes.
    Our headquarters is in University of Rhode Island, found inside the URI Library in Kingston, RI. 
    We are a team of 50+ students and faculty members who are passionate about AI and its applications.`,
    
    mission: `To democratize AI technology and empower businesses with intelligent solutions that drive growth and innovation.`,
    
    values: [
        "Innovation First: We constantly push the boundaries of AI technology",
        "Customer Success: Our clients' success is our success",
        "Ethical AI: We promote responsible and transparent AI development",
        "Continuous Learning: We evolve with the rapidly changing AI landscape"
    ],
    
    support: {
        availability: "24/7",
        channels: ["Email", "Phone", "Live Chat", "Video Call"],
        responseTime: {
            critical: "< 1 hour",
            high: "< 4 hours",
            normal: "< 24 hours"
        },
        locations: ["US", "Europe", "Asia-Pacific"]
    }
};

// Technical documentation structure
const TECHNICAL_DOCS = {
    gettingStarted: {
        quickStart: "Step-by-step guide to implement URI AI Platform",
        authentication: "API key management and security best practices",
        firstAPI: "Making your first API call"
    },
    
    apiReference: {
        endpoints: ["POST /v1/predict", "GET /v1/models", "POST /v1/train"],
        authentication: "Bearer token authentication required for all endpoints",
        rateLimit: "100 requests per minute per API key"
    },
    
    commonIssues: {
        authentication: ["Invalid API key", "Expired token", "Rate limit exceeded"],
        deployment: ["Connection timeout", "Model loading errors", "Memory issues"],
        training: ["Data format errors", "Insufficient training data", "Model convergence issues"]
    },
    
    bestPractices: [
        "Always validate input data before sending to API",
        "Implement proper error handling",
        "Use batch processing for large datasets",
        "Monitor API usage and set up alerts",
        "Regular model retraining with new data"
    ]
};

// URI AI Lab specific information
const URI_LAB_INFO = {
    location: {
        building: "URI Library",
        address: "Carothers Library, Room 147, 15 Lippitt Rd, Kingston, RI 02881",
        directions: "Located inside the URI Library main building",
        hours: "Monday-Friday: 9:00 AM - 5:00 PM",
        parking: "Available in the library parking lot"
    },
    
    team: {
        size: "50+ members",
        composition: [
            "Faculty researchers",
            "Graduate students",
            "Undergraduate researchers",
            "Industry partners"
        ],
        expertise: [
            "Machine Learning",
            "Natural Language Processing",
            "Computer Vision",
            "Robotics",
            "Data Science"
        ]
    },

    research: {
        areas: [
            "Applied AI in Healthcare",
            "Autonomous Systems",
            "Natural Language Understanding",
            "Computer Vision Applications",
            "AI Ethics and Governance"
        ],
        publications: "Over 100 research papers published",
        collaborations: [
            "Industry partnerships",
            "Academic institutions",
            "Research organizations"
        ]
    },

    contact: {
        email: "ai.lab@uri.edu",
        phone: "(401) XXX-XXXX",
        social: {
            twitter: "@URIAILab",
            linkedin: "URI AI Laboratory",
            github: "URI-AI-Lab"
        }
    },

    facilities: {
        equipment: [
            "High-performance computing cluster",
            "GPU workstations",
            "Robotics lab",
            "Testing environments"
        ],
        resources: [
            "Research libraries",
            "Dataset collections",
            "Development tools",
            "Collaboration spaces"
        ]
    }
};

export const fetchAIResponse = async (
    inputMessage: string, 
    systemPrompt: string = 'You are chatting with ZenBot, an AI assistant.',
    previousMessages: ChatMessage[] = [],
    options: ChatOptions = {}
) => {
    try {
        const messages: ChatMessage[] = [
            { role: 'system', content: systemPrompt },
            ...previousMessages,
            { role: 'user', content: inputMessage }
        ];

        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: options.model || 'gpt-3.5-turbo',
            messages: messages,
            temperature: options.temperature || 0.7,
            max_tokens: options.max_tokens || 150,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${development.OPENAI_API_KEY}`
            }
        });

        return response.data;
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Update EXAMPLE_PROMPTS with URI-specific context
export const EXAMPLE_PROMPTS = {
    customerService: `You are a helpful representative of the URI AI Laboratory, located at the University of Rhode Island.
    
    Lab Information:
    ${COMPANY_INFO.about}
    
    Location & Contact:
    - Building: ${URI_LAB_INFO.location.building}
    - Address: ${URI_LAB_INFO.location.address}
    - Hours: ${URI_LAB_INFO.location.hours}
    - Email: ${URI_LAB_INFO.contact.email}
    
    Our Team:
    We are ${URI_LAB_INFO.team.size} consisting of ${URI_LAB_INFO.team.composition.join(', ')}.
    
    Please provide friendly, accurate, and helpful responses about our lab, research, and services.
    For technical inquiries, direct them to our technical support.
    For research collaboration inquiries, mention our expertise areas: ${URI_LAB_INFO.team.expertise.join(', ')}.`,
    
    technicalSupport: `You are a technical specialist at the URI AI Laboratory.
    
    Technical Capabilities:
    ${JSON.stringify(TECHNICAL_DOCS, null, 2)}
    
    Lab Facilities:
    ${JSON.stringify(URI_LAB_INFO.facilities, null, 2)}
    
    Research Areas:
    ${URI_LAB_INFO.research.areas.join('\n')}
    
    Focus on providing clear, technical guidance while maintaining a professional academic tone.
    For complex research inquiries, suggest scheduling a meeting with our faculty members.
    When discussing technical capabilities, emphasize our high-performance computing resources and research infrastructure.`,
    
    salesAssistant: `You are a business development representative for the URI AI Laboratory.
    
    About Our Lab:
    ${COMPANY_INFO.about}
    
    Our Mission:
    ${COMPANY_INFO.mission}
    
    Research Portfolio:
    ${JSON.stringify(URI_LAB_INFO.research, null, 2)}
    
    Collaboration Opportunities:
    1. Research partnerships
    2. Industry projects
    3. Student internships
    4. Technology licensing
    
    When discussing collaboration:
    1. Understand the potential partner's specific needs and research interests
    2. Highlight relevant research areas and expertise
    3. Explain our facilities and resources
    4. Discuss potential funding and partnership models
    5. Emphasize our academic excellence and industry connections
    
    Remember to focus on mutual benefits and research impact.
    Direct detailed technical questions to our faculty experts.`
};

// Enhanced conversation context creator
export const createConversationContext = (businessInfo: string) => {
    return `As an AI assistant for URI AI, you have access to the following business context:
    ${businessInfo}
    
    Company Values:
    ${COMPANY_INFO.values.join('\n')}
    
    Available Products:
    ${Object.entries(PRODUCT_CATALOG).map(([_, product]) => product.name).join('\n')}
    
    Please provide accurate and relevant responses while maintaining our professional tone.
    If you're unsure about any specific details, acknowledge that and provide general guidance
    or offer to connect the customer with a human representative.
    
    Remember to:
    1. Stay within the scope of provided information
    2. Be transparent about limitations
    3. Maintain consistency with our brand voice
    4. Escalate complex issues to human support when necessary`;
};