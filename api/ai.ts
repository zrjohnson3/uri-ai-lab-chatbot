import React from 'react'
import axios from 'axios';

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
export interface Project {
    name: string;
    description: string;
    status: string;
    team: string[];
    technologies: string[];
    goals: string[];
    partners: string[];
    timeline: string;
    funding: string;
}

export interface CompletedProject {
    name: string;
    description: string;
    completionDate: string;
    impact: string;
    technologies: string[];
    outcomes: string[];
}

export interface UpcomingProject {
    name: string;
    description: string;
    startDate: string;
    team: string[];
    technologies: string[];
    goals: string[];
}

export interface URI_LAB_INFO_TYPE {
    location: {
        building: string;
        address: string;
        directions: string;
        hours: string;
        parking: string;
    };
    team: {
        size: string;
        composition: string[];
        expertise: string[];
    };
    projects: {
        current: Project[];
        completed: CompletedProject[];
        upcoming: UpcomingProject[];
    };
    research: {
        areas: string[];
        publications: string;
        collaborations: string[];
    };
    contact: {
        email: string;
        phone: string;
        social: {
            twitter: string;
            linkedin: string;
            github: string;
        };
    };
    facilities: {
        equipment: string[];
        resources: string[];
    };
}

export const URI_LAB_INFO: URI_LAB_INFO_TYPE = {
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

    projects: {
        current: [
            {
                name: "AI-powered Chatbots for Small Businesses",
                description: "Developing affordable and easy-to-implement chatbot solutions for small businesses",
                status: "Active",
                team: ["Faculty Lead", "2 Graduate Students", "3 Undergraduate Students"],
                technologies: ["Python", "TensorFlow", "React Native", "Node.js"],
                goals: [
                    "Create user-friendly chatbot development platform",
                    "Implement multi-language support",
                    "Develop industry-specific templates",
                    "Ensure GDPR and data privacy compliance"
                ],
                partners: ["Local Business Association", "Small Business Development Center"],
                timeline: "12 months",
                funding: "Industry Partnership Grant"
            },
            {
                name: "Ethics in AI",
                description: "Research project focusing on ethical considerations in AI development and deployment",
                status: "Active",
                team: ["Ethics Professor", "AI Researchers", "Law School Faculty"],
                technologies: ["Python", "Natural Language Processing", "Ethical AI Frameworks"],
                goals: [
                    "Develop ethical guidelines for AI development",
                    "Create assessment tools for AI bias",
                    "Study societal impact of AI decisions",
                    "Propose regulatory frameworks"
                ],
                partners: ["AI Ethics Institute", "Law School", "Industry Advisory Board"],
                timeline: "18 months",
                funding: "Research Grant"
            },
            {
                name: "Natural Language Processing Projects",
                description: "Advanced NLP research and applications development",
                status: "Active",
                team: ["NLP Specialist", "4 Graduate Students", "2 Industry Experts"],
                technologies: ["BERT", "GPT", "Transformer Models", "PyTorch"],
                goals: [
                    "Improve language model efficiency",
                    "Develop domain-specific NLP solutions",
                    "Create multilingual processing tools",
                    "Enhance sentiment analysis accuracy"
                ],
                partners: ["Tech Companies", "Research Institutions"],
                timeline: "24 months",
                funding: "Multiple Industry Grants"
            },
            {
                name: "AI for Everyone - AI Literacy Program",
                description: "Educational initiative to make AI concepts accessible to the general public",
                status: "Active",
                team: ["Education Specialist", "AI Researchers", "Content Developers"],
                technologies: ["Interactive Learning Platforms", "Visualization Tools", "Online Courseware"],
                goals: [
                    "Create beginner-friendly AI curriculum",
                    "Develop interactive learning materials",
                    "Organize community workshops",
                    "Build online learning platform"
                ],
                partners: ["Local Schools", "Community Centers", "Public Libraries"],
                timeline: "Ongoing",
                funding: "Education Grant"
            }
        ],
        completed: [
            {
                name: "Healthcare AI Assistant",
                description: "AI-powered assistant for healthcare professionals",
                completionDate: "2023",
                impact: "Deployed in 3 local hospitals",
                technologies: ["Python", "TensorFlow", "Healthcare APIs"],
                outcomes: [
                    "Reduced administrative workload by 40%",
                    "Improved patient scheduling efficiency",
                    "Enhanced medical record management"
                ]
            }
        ],
        upcoming: [
            {
                name: "Autonomous Robotics Research",
                description: "Research in autonomous systems and robotics",
                startDate: "Q2 2024",
                team: ["Robotics Expert", "2 Graduate Students"],
                technologies: ["ROS", "Computer Vision", "Machine Learning"],
                goals: [
                    "Develop autonomous navigation systems",
                    "Create object recognition models",
                    "Implement safety protocols"
                ]
            }
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

// Base system message that defines the assistant's core behavior
const BASE_SYSTEM_MESSAGE = `You are the URI AI Lab's intelligent assistant. You have comprehensive knowledge about:
- The URI AI Lab's location, team, projects, and facilities
- Our research areas and expertise
- Our contact information and hours
- Our technical capabilities and resources

You should:
1. Provide accurate, concise responses
2. Be professional and helpful
3. Maintain conversation context
4. Use specific examples when relevant
5. Admit if you're unsure about something`;

export const fetchAIResponse = async (
    inputMessage: string, 
    systemPrompt: string = BASE_SYSTEM_MESSAGE,
    previousMessages: ChatMessage[] = [],
    options: ChatOptions = {}
) => {
    try {
        // If this is a new conversation, include the system message
        const messages: ChatMessage[] = previousMessages.length === 0 ? 
            [{ role: 'system', content: systemPrompt }] : 
            previousMessages;

        // Add the new user message
        messages.push({ role: 'user', content: inputMessage });

        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: options.model || 'gpt-3.5-turbo',
            messages: messages,
            temperature: options.temperature || 0.7,
            max_tokens: options.max_tokens || 500,
            presence_penalty: 0.3,
            frequency_penalty: 0.3,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching AI response:', error);
        throw error;
    }
};

// Function to get specific context when needed
export const getSpecificContext = (topic: string): string => {
    switch(topic.toLowerCase()) {
        case 'location':
            return JSON.stringify(URI_LAB_INFO.location);
        case 'team':
            return JSON.stringify(URI_LAB_INFO.team);
        case 'projects':
            return JSON.stringify(URI_LAB_INFO.projects);
        case 'research':
            return JSON.stringify(URI_LAB_INFO.research);
        case 'contact':
            return JSON.stringify(URI_LAB_INFO.contact);
        case 'facilities':
            return JSON.stringify(URI_LAB_INFO.facilities);
        default:
            return '';
    }
};

// Remove the separate EXAMPLE_PROMPTS as we're now using a unified context approach
export const createConversationContext = (customContext: string = '') => {
    return `${customContext}\n\nPlease provide accurate and relevant responses while maintaining our professional tone.
    If you're unsure about any specific details, acknowledge that and provide general guidance
    or offer to connect the user with a human representative.`;
};