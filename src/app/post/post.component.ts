import { Component, OnInit } from '@angular/core';
import {Post} from "../post";
import {PostService} from "../post.service";
import{ FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  posts:Array<Post>;
  postForm: FormGroup;


  constructor(private _postService: PostService, fb: FormBuilder, private router: Router) {

    this.postForm = fb.group({
      'joke': [null, Validators.compose([Validators.required])],
      'answer': [null, Validators.compose([Validators.required])]
    })

  }

  ngOnInit() {
    this._postService.getPosts()
      .subscribe(res => this.posts= res);
  }

  addPost(post: Post){
    this._postService.insertPost(post)
      .subscribe(newPost => {
        this.posts.push(newPost);
        this.router.navigateByUrl('/');
      })
  }

}
