/* ========================================
   MoizDevAI
   Projects
======================================== */

import { projectsData } from "../data/projects.js";


const projectsContainer =
    document.getElementById("projects-container");

const viewMoreButton =
    document.getElementById("projects-view-more-btn");


/* ---------- Project Limits ---------- */

const DESKTOP_LIMIT = 6;

const MOBILE_LIMIT = 3;


let showAllProjects = false;


/* ---------- Get Initial Limit ---------- */

function getInitialLimit() {

    return window.innerWidth <= 768
        ? MOBILE_LIMIT
        : DESKTOP_LIMIT;

}


/* ---------- Create Project Card ---------- */

function createProjectCard(project) {

    const article =
        document.createElement("article");

    article.className = "project-card";


    const technologiesHTML =
        project.technologies
            .map(
                (technology) =>
                    `<span>${technology}</span>`
            )
            .join("");


    article.innerHTML = `

        <div class="project-image">

            <img
                src="${project.image}"
                alt="${project.title} Project"
                loading="lazy"
            >

            <span class="project-category">
                ${project.category}
            </span>

        </div>


        <div class="project-content">

            <div class="project-meta">

                <span>
                    ${String(project.id).padStart(2, "0")}
                </span>

                <span>
                    ${project.meta}
                </span>

            </div>


            <h3>
                ${project.title}
            </h3>


            <p>
                ${project.description}
            </p>


            <div class="project-tech">

                ${technologiesHTML}

            </div>


            <div class="project-actions">

                ${
                    project.github &&
                    project.github !== "#"

                        ? `
                            <a
                                href="${project.github}"
                                class="btn btn-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub Repository
                            </a>
                        `

                        : ""
                }


                ${
                    project.liveDemo &&
                    project.liveDemo !== "#"

                        ? `
                            <a
                                href="${project.liveDemo}"
                                class="btn btn-outline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Live Demo
                            </a>
                        `

                        : ""
                }

            </div>

        </div>

    `;


    return article;

}


/* ---------- Render Projects ---------- */

function renderProjects() {

    if (!projectsContainer) {

        return;

    }


    const limit = showAllProjects

        ? projectsData.length

        : getInitialLimit();


    const visibleProjects =
        projectsData.slice(0, limit);


    projectsContainer.innerHTML = "";


    visibleProjects.forEach((project) => {

        const projectCard =
            createProjectCard(project);

        projectsContainer.appendChild(projectCard);

    });


    updateViewMoreButton();

}


/* ---------- View More Button ---------- */

function updateViewMoreButton() {

    if (!viewMoreButton) {

        return;

    }


    const limit = showAllProjects

        ? projectsData.length

        : getInitialLimit();


    const hasMoreProjects =
        projectsData.length > limit;


    viewMoreButton.style.display =
        hasMoreProjects

            ? "inline-flex"

            : "none";

}


/* ---------- View More Click ---------- */

viewMoreButton?.addEventListener(
    "click",
    () => {

        showAllProjects = true;

        renderProjects();

    }
);


/* ---------- Handle Resize ---------- */

let resizeTimer;


window.addEventListener(
    "resize",
    () => {

        clearTimeout(resizeTimer);


        resizeTimer = setTimeout(
            () => {

                if (!showAllProjects) {

                    renderProjects();

                }

            },
            150
        );

    }
);


/* ---------- Initial Render ---------- */

renderProjects();