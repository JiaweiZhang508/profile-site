// Project data
const projects = [
    {
        id: 1,
        title: "Project 1",
        image: "project1-placeholder.jpg",
        description: "This is a description of Project 1. It includes details about the project, its goals, technologies used, and outcomes."
    },
    {
        id: 2,
        title: "Project 2",
        image: "project2-placeholder.jpg",
        description: "This is a description of Project 2. It includes details about the project, its goals, technologies used, and outcomes."
    }
];

// Load project details
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    if (projectId) {
        const project = projects.find(p => p.id == projectId);
        if (project) {
            document.getElementById('project-title').textContent = project.title;
            document.getElementById('project-img').src = project.image;
            document.getElementById('project-description').textContent = project.description;
        }
    }

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            document.querySelectorAll('nav a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
