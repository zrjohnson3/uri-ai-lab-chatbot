import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { URI_LAB_INFO, Project } from '../api/ai';

interface LandingProps {
    navigation: {
        navigate: (screen: string, params?: any) => void;
    };
}

type SectionKey = 'get-started' | 'research' | 'projects' | 'contact';

const Landing = ({ navigation }: LandingProps) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const [activeTab, setActiveTab] = useState<SectionKey>('get-started');
    const sectionRefs: Record<SectionKey, React.RefObject<View>> = {
        'get-started': useRef<View>(null),
        'research': useRef<View>(null),
        'projects': useRef<View>(null),
        'contact': useRef<View>(null),
    };

    const handleRoleSelect = (role: string) => {
        navigation.navigate('Chatbot', { userRole: role });
    };

    const scrollToSection = (section: SectionKey) => {
        setActiveTab(section);
        sectionRefs[section].current?.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
            scrollViewRef.current?.scrollTo({
                y: pageY - 100, // Offset to account for the tab bar
                animated: true
            });
        });
    };

    return (
        <ScrollView 
            ref={scrollViewRef}
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            {/* Hero Section */}
            <View style={styles.heroSection}>
                <Text style={styles.heroTitle}>URI AI Laboratory</Text>
                <Text style={styles.heroSubtitle}>Advancing AI Research & Innovation</Text>
            </View>

            {/* Quick Stats */}
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>50+</Text>
                    <Text style={styles.statLabel}>Team Members</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>100+</Text>
                    <Text style={styles.statLabel}>Research Papers</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>4</Text>
                    <Text style={styles.statLabel}>Active Projects</Text>
                </View>
            </View>

            {/* Tab Navigation */}
            <View style={styles.tabContainer}>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    style={styles.tabScroll}
                >
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'get-started' && styles.activeTab]}
                        onPress={() => scrollToSection('get-started')}
                    >
                        <Text style={[styles.tabText, activeTab === 'get-started' && styles.activeTabText]}>
                            Get Started
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'research' && styles.activeTab]}
                        onPress={() => scrollToSection('research')}
                    >
                        <Text style={[styles.tabText, activeTab === 'research' && styles.activeTabText]}>
                            Research Areas
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'projects' && styles.activeTab]}
                        onPress={() => scrollToSection('projects')}
                    >
                        <Text style={[styles.tabText, activeTab === 'projects' && styles.activeTabText]}>
                            Projects
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'contact' && styles.activeTab]}
                        onPress={() => scrollToSection('contact')}
                    >
                        <Text style={[styles.tabText, activeTab === 'contact' && styles.activeTabText]}>
                            Contact
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            {/* User Type Selection */}
            <View ref={sectionRefs['get-started']} style={styles.section}>
                <Text style={styles.sectionTitle}>Get Started</Text>
                <Text style={styles.sectionSubtitle}>Select your role to begin</Text>
                
                <TouchableOpacity
                    style={[styles.roleButton, { backgroundColor: '#003DA5' }]}
                    onPress={() => handleRoleSelect('student')}
                >
                    <Text style={styles.roleButtonText}>Student</Text>
                    <Text style={styles.roleButtonSubtext}>Access research materials and project information</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.roleButton, { backgroundColor: '#003DA5' }]}
                    onPress={() => handleRoleSelect('faculty')}
                >
                    <Text style={styles.roleButtonText}>Faculty</Text>
                    <Text style={styles.roleButtonSubtext}>Research collaboration and lab resources</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.roleButton, { backgroundColor: '#003DA5' }]}
                    onPress={() => handleRoleSelect('industry')}
                >
                    <Text style={styles.roleButtonText}>Industry Partner</Text>
                    <Text style={styles.roleButtonSubtext}>Explore collaboration opportunities</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.roleButton, { backgroundColor: '#003DA5' }]}
                    onPress={() => handleRoleSelect('public')}
                >
                    <Text style={styles.roleButtonText}>General Public</Text>
                    <Text style={styles.roleButtonSubtext}>Learn about our research and initiatives</Text>
                </TouchableOpacity>
            </View>

            {/* Research Areas */}
            <View ref={sectionRefs['research']} style={styles.section}>
                <Text style={styles.sectionTitle}>Research Areas</Text>
                <View style={styles.researchGrid}>
                    {URI_LAB_INFO.research.areas.map((area: string, index: number) => (
                        <View key={index} style={styles.researchItem}>
                            <Text style={styles.researchText}>{area}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Current Projects */}
            <View ref={sectionRefs['projects']} style={styles.section}>
                <Text style={styles.sectionTitle}>Current Projects</Text>
                {URI_LAB_INFO.projects.current.map((project: Project, index: number) => (
                    <View key={index} style={styles.projectCard}>
                        <Text style={styles.projectTitle}>{project.name}</Text>
                        <Text style={styles.projectDesc}>{project.description}</Text>
                        <View style={styles.projectTech}>
                            {project.technologies.map((tech: string, techIndex: number) => (
                                <View key={techIndex} style={styles.techTag}>
                                    <Text style={styles.techText}>{tech}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </View>

            {/* Contact Information */}
            <View ref={sectionRefs['contact']} style={styles.section}>
                <Text style={styles.sectionTitle}>Contact Us</Text>
                <View style={styles.contactInfo}>
                    <Text style={styles.contactText}>📍 {URI_LAB_INFO.location.address}</Text>
                    <Text style={styles.contactText}>📧 {URI_LAB_INFO.contact.email}</Text>
                    <Text style={styles.contactText}>⏰ {URI_LAB_INFO.location.hours}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    heroSection: {
        padding: 30,
        paddingTop: 40,
        paddingBottom: 60,
        backgroundColor: '#003DA5',
        alignItems: 'center',
    },
    heroTitle: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 12,
        letterSpacing: 0.5,
    },
    heroSubtitle: {
        fontSize: 18,
        color: '#ffffff',
        opacity: 0.9,
        letterSpacing: 0.25,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 25,
        paddingVertical: 30,
        backgroundColor: '#ffffff',
        marginTop: -40,
        marginHorizontal: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 10,
    },
    statNumber: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#003DA5',
        marginBottom: 8,
    },
    statLabel: {
        fontSize: 13,
        color: '#64748b',
        textAlign: 'center',
        lineHeight: 18,
    },
    section: {
        padding: 20,
        backgroundColor: '#ffffff',
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 15,
    },
    sectionSubtitle: {
        fontSize: 16,
        color: '#64748b',
        marginBottom: 20,
    },
    researchGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    researchItem: {
        backgroundColor: '#f1f5f9',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    researchText: {
        color: '#1e293b',
        fontSize: 14,
    },
    projectCard: {
        backgroundColor: '#f8fafc',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    projectTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 5,
    },
    projectDesc: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 10,
    },
    projectTech: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    techTag: {
        backgroundColor: '#e2e8f0',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    techText: {
        fontSize: 12,
        color: '#475569',
    },
    roleButton: {
        padding: 20,
        borderRadius: 10,
        marginBottom: 15,
    },
    roleButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 5,
    },
    roleButtonSubtext: {
        fontSize: 14,
        color: '#ffffff',
        opacity: 0.9,
    },
    contactInfo: {
        gap: 10,
    },
    contactText: {
        fontSize: 16,
        color: '#64748b',
    },
    tabContainer: {
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    tabScroll: {
        flexGrow: 1,
    },
    tab: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 20,
        backgroundColor: '#f1f5f9',
    },
    activeTab: {
        backgroundColor: '#003DA5',
    },
    tabText: {
        fontSize: 14,
        color: '#64748b',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#ffffff',
    },
});

export default Landing;
