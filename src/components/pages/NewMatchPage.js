import React from 'react';
import Field2D from '../containers/Field2D';
import soccerFieldUrl from '../../assets/soccer-field.png';
import { FormControl, Select, MenuItem, InputLabel, Typography, Grid, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import esLocale from 'date-fns/locale/es'
import { createTeam } from '../../libs/teamFactory';

const TEAM_SIZES = [5, 6, 7, 11];
const FIELD_CONFIG = { width: 600, height: 390, textureUrl: soccerFieldUrl };

export default class NewMatch extends React.Component {

  state = { singleTeam: true, teamSize: 7, publicMatch: true, date: new Date() }; 

  render() {
    return (
      <React.Fragment>
        {this.renderForm()}
        {this.renderSoccerField()}
        <Button fullWidth variant="contained" color="primary">crear convocatoria</Button>
      </React.Fragment>
    );
  }

  renderForm() {
    return (
      <form autoComplete="false">
        <Typography variant="h6" gutterBottom>
          Nueva convocatoria
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="team-size">Tamaño de equipo</InputLabel>
              <Select
                value={this.state.teamSize}
                onChange={event => this.setState({ teamSize: event.target.value })}
                inputProps={{ name: 'team-size', id: 'team-size' }}
              >
                {TEAM_SIZES.map(size => <MenuItem key={size} value={size}>{size}</MenuItem>)}
              </Select>
            </FormControl>

            <FormControl component="fieldset">
              <FormLabel> Equipos en el partido</FormLabel>
              <RadioGroup
                name="match-type"
                value={this.state.singleTeam ? 'single' : 'multiple'}
                onChange={event => this.setState({ singleTeam: event.target.value === 'single' })}
              >
                <FormControlLabel value="single" control={<Radio />} label="convocatoria con unico equipo" />
                <FormControlLabel value="multiple" control={<Radio />} label="convocatoria con dos equpos (equipo local y visitante)" />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset">
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
            </FormControl>

            <FormControl>
            <FormLabel> Fecha y hora</FormLabel>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                <Grid container justify="space-around">
                  <DatePicker
                    margin="normal"
                    value={this.state.date}
                    onChange={date => this.setState({ date })}
                  />
                  <TimePicker
                    margin="normal"
                    value={this.state.date}
                    onChange={date => this.setState({ date })}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    )
  }

  renderSoccerField() {
    const { teamSize, singleTeam } = this.state;
    return (
      <Field2D
          field={FIELD_CONFIG}
          homeTeam={createTeam(teamSize, true)}
          awayTeam={createTeam(singleTeam ? 0 : teamSize, false)} />
    )
  }

}