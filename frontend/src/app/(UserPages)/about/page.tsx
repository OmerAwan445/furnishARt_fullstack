"use client";
import { AboutUsCard } from "@/components/AboutusCard";
import { Box, Container, Grid, Typography, useTheme } from "@mui/material";

const AboutUsPage = () => {
  const theme = useTheme();

  const developers = [
    {
      name: "Muhammad Umer",
      role: "Full Stack Developer",
      avatar: "/Umer.jpg", // Replace with actual image path
      description:
        "Umer developed the full-stack application, ensuring a seamless user experience with a scalable and secure backend.",
      githubUrl: "https://github.com/OmerAwan445",
      linkedinUrl: "https://www.linkedin.com/in/muhammad-umer-988b31221/",
    },
    {
      name: "Muhammad Noman",
      role: "AR App Developer",
      avatar: "/Noman.png", // Replace with actual image path
      description:
        "Noman developed the entire AR feature, integrating augmented reality functionalities seamlessly into the app.",
      githubUrl: "https://github.com/mnomandev",
      linkedinUrl: "https://www.linkedin.com/in/mnomandev/",
    },
    {
      name: "Hafiz Talha Nazir",
      role: "3D Modeler & Designer",
      avatar: "/Talha.jpg", // Replace with actual image path
      description:
        "Talha designed and created all 3D models using Blender, ensuring high-quality and realistic assets that enhance the AR experience within the application.",
      githubUrl: "https://github.com/TalhaNazir7",
      linkedinUrl: "https://www.linkedin.com/in/hafiz-talha-nazir/",
    },
  ];
 
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h2"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: theme.palette.primary.dark,
          mb: 6,
        }}
      >
        About Us
      </Typography>

      <Typography
        variant="body1"
        align="center"
        sx={{
          color: theme.palette.text.secondary,
          maxWidth: "800px",
          mx: "auto",
          mb: 8,
        }}
      >
          FurnishARt is our Final Year Project (FYP), designed to revolutionize the online furniture shopping experience using Augmented Reality (AR). Our team has combined technology and creativity to develop an interactive platform that allows users to visualize furniture in their own space before making a purchase. From full-stack development to 3D modeling and AR integration, every aspect of this project showcases our dedication to innovation and problem-solving.

      </Typography>

      <div className="flex flex-wrap gap-20 justify-center">
        {developers.map((developer, index) => (
            <AboutUsCard
              name={developer.name}
              description={developer.description}
              role={developer.role}
              imageUrl={developer.avatar}
              linkedinUrl={developer.linkedinUrl}
              githubUrl={developer.githubUrl}
            />
           ))}
      </div>

      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.dark,
            mb: 3,
          }}
        >
          Our Mission
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            maxWidth: "800px",
            mx: "auto",
          }}
        >
            Our mission with FurnishARt is to enhance the online furniture shopping experience by integrating Augmented Reality (AR) technology. We aim to bridge the gap between digital and physical shopping, allowing users to visualize furniture in their space before making a purchase. Through innovation, creativity, and technical excellence, we strive to make furniture selection more interactive, convenient, and reliable.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUsPage;
