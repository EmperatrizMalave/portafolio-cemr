import {
  Facebook,
  Linkedin,
  Instagram,
  Github,
  Envelope,
  FileEarmarkArrowDown,
} from "react-bootstrap-icons";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61593324203754";
const LINKEDIN_URL = "https://www.linkedin.com/in/coromoto-malave-rengel/";
const INSTAGRAM_URL = "https://www.instagram.com/cemrtechspace/";

// Pega la URL cuando la tengas. Vacío = el icono no se muestra.
export const githubUrl = "";

// PENDIENTE: correo. Vacío = no se muestra.
export const emailAddress = "";

// PENDIENTE: CV. PDF en public/, por ejemplo "/cv-coromoto-malave.pdf". Vacío = no se muestra.
export const cvPath = "";

export const socialIcons = [
  {
    id: 1,
    label: "Facebook",
    icon: <Facebook />,
    href: FACEBOOK_URL,
  },
  {
    id: 2,
    label: "LinkedIn",
    icon: <Linkedin />,
    href: LINKEDIN_URL,
  },
  {
    id: 3,
    label: "Instagram",
    icon: <Instagram />,
    href: INSTAGRAM_URL,
  },
  ...(githubUrl
    ? [
        {
          id: 4,
          label: "GitHub",
          icon: <Github />,
          href: githubUrl,
        },
      ]
    : []),
];

export const emailLink = emailAddress
  ? {
      href: `mailto:${emailAddress}`,
      label: emailAddress,
      icon: <Envelope />,
    }
  : null;

export const cvLink = cvPath
  ? {
      href: cvPath,
      icon: <FileEarmarkArrowDown />,
    }
  : null;
