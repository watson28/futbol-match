import React from 'react';
import { Select, MenuItem, InputLabel, Typography, Grid, FormLabel, RadioGroup, FormControlLabel, Radio, Button, FormControl, withStyles } from '@material-ui/core';
import { TimePicker, DatePicker } from 'material-ui-pickers';
import BoxContainer from '../presentationals/BoxContainer';

const TEAM_SIZES = [5, 6, 7, 11];

const styles = theme => ({
  root: {
    maxWidth: '600px',
    margin: '0 auto'
  }
});

// TODO: convert this to a functional component
class CreateMatchForm extends React.Component {

  state = { singleTeam: true, teamSize: 7, publicMatch: true, date: null };

  render() {
    return (
      <BoxContainer className={this.props.classes.root}>
        <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
          Nueva convocatoria
        </Typography>
        <form autoComplete="false">
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="team-size">Tamaño de equipo</InputLabel>
                <Select
                  value={this.state.teamSize}
                  onChange={event => this.setState({ teamSize: event.target.value })}
                  inputProps={{ name: 'team-size', id: 'team-size' }}
                >
                  {TEAM_SIZES.map(size => <MenuItem key={size} value={size}>{size} jugadores</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePicker
                margin="normal"
                label="Fecha"
                fullWidth
                value={this.state.date}
                onChange={date => this.setState({ date })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TimePicker
                margin="normal"
                label="Hora"
                fullWidth
                value={this.state.date}
                onChange={date => this.setState({ date })}
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabel> Equipos en el partido</FormLabel>
              <RadioGroup
                name="match-type"
                value={this.state.singleTeam ? 'single' : 'multiple'}
                onChange={event => this.setState({ singleTeam: event.target.value === 'single' })}
              >
                <FormControlLabel value="single" control={<Radio />} label="convocatoria con unico equipo" />
                <FormControlLabel value="multiple" control={<Radio />} label="convocatoria con dos equpos (equipo local y visitante)" />
              </RadioGroup>
            </Grid>

            <Grid item xs={12}>
              <FormLabel>Tipo de convocatoria</FormLabel>
              <RadioGroup
                value={this.state.publicMatch ? 'public' : 'private'}
                onChange={event => this.setState({ publicMatch: event.target.value === 'public' })}
              >
                <FormControlLabel
                  value="public"
                  control={<Radio />}
                  label="convocatoria publica: cualquier persona puede participar." />
                <FormControlLabel
                  value="private"
                  control={<Radio />}
                  label="convocatoria privada: solo las personas que invites pueden participar." />
              </RadioGroup>
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => this.props.onSubmit(this.state)}>crear convocatoria</Button>
            </Grid>
          </Grid>
        </form>
      </BoxContainer>
    );
  }
}

export default withStyles(styles)(CreateMatchForm);
