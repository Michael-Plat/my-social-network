(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[4],{294:function(e,t,a){e.exports={descriptionBlock:"ProfileInfo_descriptionBlock__3cd8Y",mainPhoto:"ProfileInfo_mainPhoto__1Fgjo",contact:"ProfileInfo_contact__1N3gp"}},296:function(e,t,a){e.exports={postBlock:"MyPosts_postBlock__3b6E0",posts:"MyPosts_posts__3tZ1c"}},297:function(e,t,a){e.exports={item:"Post_item__ihtu9"}},303:function(e,t,a){"use strict";a.r(t);var n=a(35),o=a(36),l=a(39),r=a(38),s=a(0),c=a.n(s),i=a(17),u=a(96),m=a(296),p=a.n(m),d=a(297),f=a.n(d),b=function(e){var t=e.message,a=e.numberLike;return c.a.createElement("div",{className:f.a.item},c.a.createElement("img",{src:"https://proprikol.ru/wp-content/uploads/2020/02/kartinki-na-avatarku-dlya-parnej-i-muzhchin-1-1.jpg"}),t,c.a.createElement("div",null,c.a.createElement("button",null,a," Like")))},E=a(129),v=a(47),h=a(24),k=Object(v.a)(50),g=Object(E.a)({form:"myPostsAddPostForm"})((function(e){return c.a.createElement("form",{onSubmit:e.handleSubmit},c.a.createElement("div",null,Object(h.c)("New Post","newPostBody",h.b,[v.b,k])),c.a.createElement("div",null,c.a.createElement("button",null,"Add Post")))})),P=c.a.memo((function(e){var t=e.posts.map((function(e){return c.a.createElement(b,{message:e.message,numberLike:e.numberLike,key:e.id})}));return c.a.createElement("div",{className:p.a.postBlock},c.a.createElement("h3",null,"My posts"),c.a.createElement("div",null,c.a.createElement("div",null,c.a.createElement(g,{onSubmit:function(t){e.addPost(t.newPostBody)}}))),c.a.createElement("div",{className:p.a.posts},t))})),O=Object(i.b)((function(e){return{posts:e.profilePage.posts}}),{addPost:u.a.addPostActionCreator})(P),j=a(95),y=a(65),S=a(294),_=a.n(S),A=function(e){var t=Object(s.useState)(!1),a=Object(j.a)(t,2),n=a[0],o=a[1],l=Object(s.useState)(e.status),r=Object(j.a)(l,2),i=r[0],u=r[1];Object(s.useEffect)((function(){u(e.status)}),[e.status]);return c.a.createElement("div",null,!n&&c.a.createElement("div",null,c.a.createElement("b",null,"Status: "),c.a.createElement("span",{onDoubleClick:function(){o(!0)}},e.status||"No status")),n&&c.a.createElement("div",null,c.a.createElement("input",{onChange:function(e){u(e.currentTarget.value)},autoFocus:!0,onBlur:function(){o(!1),e.updateStatus(i)},value:i,type:"text"})))},M=a(127),N=a.n(M),w=a(48),F=a.n(w),I=Object(E.a)({form:"edit-profile"})((function(e){var t=e.handleSubmit,a=e.profile,n=e.error;return c.a.createElement("form",{onSubmit:t},c.a.createElement("div",null,c.a.createElement("button",{onClick:function(){}},"save")),c.a.createElement("div",null,n&&c.a.createElement("div",{className:F.a.formSummaryError},n)),c.a.createElement("div",null,c.a.createElement("b",null,"My name"),": ",Object(h.c)("My name","fullName",h.a,[])),c.a.createElement("div",null,c.a.createElement("b",null,"Loking for a job"),":",Object(h.c)("","lookingForAJob",h.a,[],{type:"checkbox"})),c.a.createElement("div",null,c.a.createElement("b",null,"My professional skills"),":",Object(h.c)("My professional skills","lookingForAJobDescription",h.b,[])),c.a.createElement("div",null,c.a.createElement("b",null,"About me"),":",Object(h.c)("About me","aboutMe",h.b,[])),c.a.createElement("div",null,c.a.createElement("b",null,"Contacts"),": ",Object.keys(a.contacts).map((function(e){return c.a.createElement("div",{key:e,className:_.a.contact},c.a.createElement("b",null,e,": ",Object(h.c)(e,"contacts."+e,h.a,[])," "))}))))})),B=function(e){var t=e.contactTitle,a=e.contactValue;return c.a.createElement("div",{className:_.a.contact},c.a.createElement("b",null,t,": "),a)},C=function(e){var t=e.profile,a=e.isOwner,n=e.goToEditMode;return c.a.createElement("div",null,a&&c.a.createElement("div",null,c.a.createElement("button",{onClick:n},"edit")),c.a.createElement("div",null,c.a.createElement("b",null,"My name"),": ",t.fullName),c.a.createElement("div",null,c.a.createElement("b",null,"Loking for a job"),": ",t.lookingForAJob?"Yes":"No"),t.lookingForAJob&&c.a.createElement("div",null,c.a.createElement("b",null,"My professional skills"),": ",t.lookingForAJobDescription),c.a.createElement("div",null,c.a.createElement("b",null,"About me"),": ",t.aboutMe),c.a.createElement("div",null,c.a.createElement("b",null,"Contacts"),": ",Object.keys(t.contacts).map((function(e){return c.a.createElement(B,{key:e,contactTitle:e,contactValue:t.contacts[e]})}))))},L=function(e){var t=e.profile,a=e.status,n=e.updateStatus,o=e.isOwner,l=e.savePhoto,r=e.saveProfile,i=Object(s.useState)(!1),u=Object(j.a)(i,2),m=u[0],p=u[1];if(!t)return c.a.createElement(y.a,null);return c.a.createElement("div",null,c.a.createElement("div",null,c.a.createElement("img",{src:"https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg"})),c.a.createElement("div",{className:_.a.descriptionBlock},c.a.createElement("img",{src:t.photos.large||N.a,className:_.a.mainPhoto}),o&&c.a.createElement("input",{type:"file",onChange:function(e){var t;(null===(t=e.target.files)||void 0===t?void 0:t.length)&&l(e.target.files[0])}}),c.a.createElement(A,{status:a,updateStatus:n}),m?c.a.createElement(I,{profile:t,initialValues:t,onSubmit:function(e){r(e).then((function(){p(!1)}))}}):c.a.createElement(C,{goToEditMode:function(){p(!0)},profile:t,isOwner:o})))},J=function(e){return c.a.createElement("div",null,c.a.createElement(L,{savePhoto:e.savePhoto,profile:e.profile,isOwner:e.isOwner,status:e.status,updateStatus:e.updateStatus,saveProfile:e.saveProfile}),c.a.createElement(O,null))},U=a(10),x=a(9),D=function(e){Object(l.a)(a,e);var t=Object(r.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"reFreshProfile",value:function(){var e=+this.props.match.params.userId;e||(e=this.props.authorizedUserId)||this.props.history.push("/login"),e?(this.props.getUserProfile(e),this.props.getStatus(e)):console.error("ID should exists in URI params or in state ('authorizedUserId')")}},{key:"componentDidMount",value:function(){this.reFreshProfile()}},{key:"componentDidUpdate",value:function(e){this.props.match.params.userId!=e.match.params.userId&&this.reFreshProfile()}},{key:"render",value:function(){return c.a.createElement(J,Object.assign({},this.props,{profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateStatus,isOwner:!this.props.match.params.userId,savePhoto:this.props.savePhoto}))}}]),a}(c.a.Component);t.default=Object(x.d)(Object(i.b)((function(e){return{profile:e.profilePage.profile,status:e.profilePage.status,authorizedUserId:e.auth.userId,isAuth:e.auth.isAuth}}),{getUserProfile:u.d,getStatus:u.c,updateStatus:u.g,savePhoto:u.e,saveProfile:u.f}),U.g)(D)}}]);
//# sourceMappingURL=4.4ea2226a.chunk.js.map