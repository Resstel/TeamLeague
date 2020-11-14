import { Component, OnInit, ViewChildren, QueryList, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";

@Component({
  selector: "app-sampleform",
  templateUrl: "./sampleform.component.html",
  styleUrls: ["./sampleform.component.css"]
})
export class SampleformComponent implements OnInit {
  leagueForm: FormGroup;
@ViewChildren("selectTeam") TeamSelects: QueryList<ElementRef<HTMLSelectElement>>;
  constructor(private fb: FormBuilder) {}
  teamList = [
    {id:1, name:"Real madrid"},
    {id:2, name:"Fc barcalone"},
    {id:3, name:"Atletico madrid"},
    {id:4, name:"Fc seville"},
    {id:5, name:"Valencia"}
  ];

  selectedTeams = new Set<string>();

  logToConsole(object: any) {
    console.log(object);
  }

  ngOnInit() {
    this.leagueForm = this.fb.group({
      league_details: this.fb.group({
        name: "",
        founder: ""
      }),
      teams: this.fb.array([this.teams])
    });
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

  deletePlayer(team, index, t: string) {
    this.selectedTeams.delete(t);
    team.get("players").removeAt(index);
  }

  selected() {
    this.selectedTeams.clear();
    this.TeamSelects.forEach(ts => {
      const selectedVal = ts.nativeElement.value;
      if (selectedVal && selectedVal !== "undefined") this.selectedTeams.add(selectedVal);
    });

    this.selectedTeams.forEach(st => {
      console.log(`selected team -> ${st}`);
    });
    console.log("==================================");
  }

  isSelected(lang: string) {
    return this.selectedTeams.has(lang);
  }
}
