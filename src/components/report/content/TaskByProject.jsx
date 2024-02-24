import React from 'react';
import { Typography, Divider, useMediaQuery } from '@mui/material';
import { projectsData } from '../../../mockData/projectsData';

const CustomTaskCounter = ({ quantityTasks }) => {
    return (
        <div style={{
            position: 'absolute',
            bottom: `${quantityTasks * 5}px`,
            left: '150%',
            transform: 'translateX(-50%)',
            backgroundColor: '#000',
            color: '#fff',
            padding: '4px 8px',
            fontSize: '10px',
            width: "max-content",
            borderRadius: "30px 30px 30px 0px",
        }}>
            {`${quantityTasks} tasks`}
        </div>
    );
};

const TaskByProject = () => {
    const isLittleScreen = useMediaQuery("(max-width:800px)");

    const filteredProjects = projectsData.filter(project => (
        project.projectName === "Peceland App Design" ||
        project.projectName === "Microsoft illustration pack" ||
        project.projectName === "Nasa cosmic website concept"
    )).slice(0, 3);

    const colors = ['#459CED', '#D377F3', '#5D923D'];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: "28px", marginTop: "-2%", marginBottom: "2.6vh", borderRadius: "12px", border: "1px solid #E0E3E8", margin: 12 }}>
            {/* Primera fila */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <Typography variant='h3' sx={{ color: '#1D1F24', fontFamily: 'Poppins', fontSize: '18px', fontWeight: "bold" }}>
                    25</Typography>
            </div>
            {/* Segunda fila */}
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                {filteredProjects.map((project, index) => (
                    <div key={project.id} style={{ display: 'flex', alignItems: 'flex-end', position: 'relative' }}>
                        <div style={{ height: `${project.quantityTasks * 5}px`, width: '44px', backgroundColor: colors[index], borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}>
                            {/* Elemento sobre la barra */}
                           {!isLittleScreen && <CustomTaskCounter quantityTasks={project.quantityTasks} />
                        }
                        </div>
                    </div>
                ))}
            </div>
            {/* Divider */}
            <Divider variant="middle" style={{
                border: '1px solid #E0E3E8',
            }} />
            {/* Tercera fila */}
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '8px' }}>
                {filteredProjects.map((project, index) => (
                    <div key={project.id} style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" style={{ maxWidth: '6rem', fontSize: isLittleScreen ? "12px" : '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: isLittleScreen ? 'wrap' : 'nowrap', textAlign: "center" }}>
                            {project.projectName}
                        </Typography>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskByProject;
