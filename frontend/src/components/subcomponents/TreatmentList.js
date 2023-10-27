import React from "react";
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

TreatmentList.propTypes = {
    treatment_vals: PropTypes.shape({
      timegap: PropTypes.string.isRequired,
      symptoms: PropTypes.array.isRequired,
      services: PropTypes.array.isRequired,
      drugs: PropTypes.array.isRequired,
    }).isRequired,
};

export default function TreatmentList(vals) {
    return (
        <Box sx={{ width: '100%', maxWidth: window.screen.width-20 , bgcolor: 'background.paper' }}>
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Timegap" 
                    secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {vals.timegap}
                          </Typography>
                        </React.Fragment>
                      }
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Symptoms" 
                    secondary={
                        <React.Fragment>
                          {vals.symptoms.map((symptom => (
                            <Typography
                            display=""
                            variant="body2"
                            color="text.primary"
                          >
                            {symptom}
                          </Typography>
                        )))
                        }
                        </React.Fragment>
                      }
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Services" 
                    secondary={
                        <React.Fragment>
                          {vals.services.map((serve => (
                            <Typography
                            variant="body2"
                            color="text.primary"
                          >
                            {serve}
                          </Typography>
                        )))
                        }
                        </React.Fragment>
                      }
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Drugs" 
                  secondary={
                    <React.Fragment>
                      {vals.drugs.map((drug => (
                        <Typography
                        variant="body2"
                        color="text.primary"
                      >
                        {drug}
                      </Typography>
                    )))
                    }
                    </React.Fragment>
                  }/>
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
          <Divider />
        </Box>
    );
}