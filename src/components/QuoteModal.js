import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const style = {
  position: "absolute",
  bottom: "0",
  minWidth: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px 10px 0 0",
  height: "13vh",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
};

export default function QuoteModal(props) {
  const socialMedia = [
    {
      name: "WhatsApp",
      icon: WhatsAppIcon,
      link: `https://api.whatsapp.com/send?text=${props.text}`,
    },
    {
      name: "Facebook",
      icon: FacebookIcon,
      link: `https://www.facebook.com/sharer/sharer.php?u=${props.text}`,
    },
    {
      name: "Twitter",
      icon: TwitterIcon,
      link: `https://twitter.com/intent/tweet?url=${props.text}`,
    },
    {
      name: "LinkedIn",
      icon: LinkedInIcon,
      link: `https://www.linkedin.com/sharing/share-offsite/?url=${props.text}`,
    },
  ];

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.close}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <Box sx={{ padding: "20px" }}>
              <Typography sx={{ mb: 1 }}> Share on </Typography>
              {socialMedia.map((item, index) => (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginRight: "20px", textDecoration: "none", color: "inherit" }}
                  key={index}
                >
                  <item.icon fontSize="large" color="dark" />
                </a>
              ))}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
