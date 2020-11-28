import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-sampleform",
  templateUrl: "./sampleform.component.html",
  styleUrls: ["./sampleform.component.css"]
})
export class SampleformComponent implements OnInit {
  leagueForm: FormGroup;
  
  constructor(private fb: FormBuilder, private http: HttpClient) 
  {
    this.leagueForm = this.fb.group({
      league_details: this.fb.group({
        name: "",
        founder: ""
      }),
      teams: this.fb.array([this.teams])
    });
  }

  logToConsole(object: any) {
    console.log(object);
  }

  ngOnInit() {
    // this.leagueForm = this.fb.group({
    //   league_details: this.fb.group({
    //     name: "",
    //     founder: ""
    //   }),
    //   teams: this.fb.array([this.teams])
    // });
    this.http.get('/assets/data.json').subscribe((data: any[])=> {
      this.leagueForm = this.fb.group({
        league_details: this.fb.group(data.map(datum => 
          this.generateDatumFormGroup(datum)))
    });
  });
  }
  private generateDatumFormGroup(datum)
  {
    return this.fb.group({
      name: this.fb.control({value: datum.name}),
      founder: this.fb.control({value: datum.founder}),
      teams: this.fb.array([])
    });
  }

  private generateDatumFormArray(data)
  {
    let FormTeams  = <FormArray>this.leagueForm.controls['teams'];
      team_name: this.fb.control ({team_name: data.team_name});
      // players: this.fb.array(FormTeams.push(this.players))
      // return FormTeams;
  }
  
  get teams(): FormGroup {
    return this.fb.group({
      team_name: "",
      players: this.fb.array([this.players])
    });
  }

  get players(): FormGroup {
    return this.fb.group({
      player_name: "",
      player_number: ""
    });
  }

  addTeam() {
    (this.leagueForm.get("teams") as FormArray).push(this.teams);
  }

  deleteTeam(index) {
    (this.leagueForm.get("teams") as FormArray).removeAt(index);
  }

  addPlayer(team) {
    team.get("players").push(this.players);
  }

  deletePlayer(team, index) {
    team.get("players").removeAt(index);
  }
}
