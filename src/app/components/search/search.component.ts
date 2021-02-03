import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { NewsService } from '../../service/news.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search : FormGroup;
  data=[];

  items = Array.from({length: 1000}).map((_, i) => `Item #${i}`);

  constructor(private _newsService: NewsService) { }

  ngOnInit(): void {
   this._newsService.getTopNews().subscribe(results=>{
       this.data = results.news;
       console.log(results);
    })
    
  	this.search = new FormGroup({
  		query: new FormControl(null),
  		cnn : new FormControl(false),
  		bbcnews: new FormControl(false),
  		abcnews: new FormControl(false),
  		bbcsports : new FormControl(false),
  		espn : new FormControl(false),
  		buzzfeed: new FormControl(false),
  		businessinsider: new FormControl(false)
  	})
  }

  onSearch(){
  	// console.log(this.search.value);
    this._newsService.getNewsSearch(this.search.value).subscribe(results=>{
      this.data = results.news;
      console.log(results);
    })
  }

}
