"use strict";(self.webpackChunknx_dotnet=self.webpackChunknx_dotnet||[]).push([[124],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>f});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var u=n.createContext({}),s=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},c=function(e){var t=s(e.components);return n.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,o=e.originalType,u=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),d=s(r),f=i,h=d["".concat(u,".").concat(f)]||d[f]||p[f]||o;return r?n.createElement(h,l(l({ref:t},c),{},{components:r})):n.createElement(h,l({ref:t},c))}));function f(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=r.length,l=new Array(o);l[0]=d;var a={};for(var u in t)hasOwnProperty.call(t,u)&&(a[u]=t[u]);a.originalType=e,a.mdxType="string"==typeof e?e:i,l[1]=a;for(var s=2;s<o;s++)l[s]=r[s];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},4319:(e,t,r)=>{r.r(t),r.d(t,{frontMatter:()=>a,metadata:()=>u,toc:()=>s,default:()=>p});var n=r(7462),i=r(3366),o=(r(7294),r(3905)),l=["components"],a={},u={unversionedId:"core/executors/publish",id:"core/executors/publish",isDocsHomePage:!1,title:"@nx-dotnet/core:publish",description:"NxDotnet Publish",source:"@site/../../docs/core/executors/publish.md",sourceDirName:"core/executors",slug:"/core/executors/publish",permalink:"/docs/core/executors/publish",editUrl:"https://github.com/nx-dotnet/nx-dotnet/edit/master/docs/../../docs/core/executors/publish.md",version:"current",frontMatter:{},sidebar:"someSidebar",previous:{title:"@nx-dotnet/core:format",permalink:"/docs/core/executors/format"},next:{title:"@nx-dotnet/core:serve",permalink:"/docs/core/executors/serve"}},s=[{value:"NxDotnet Publish",id:"nxdotnet-publish",children:[]},{value:"Options",id:"options",children:[{value:"configuration",id:"configuration",children:[]},{value:"framework",id:"framework",children:[]},{value:"force",id:"force",children:[]},{value:"noBuild",id:"nobuild",children:[]},{value:"noDependencies",id:"nodependencies",children:[]},{value:"nologo",id:"nologo",children:[]},{value:"noRestore",id:"norestore",children:[]},{value:"output",id:"output",children:[]},{value:"selfContained",id:"selfcontained",children:[]},{value:"runtime",id:"runtime",children:[]},{value:"verbosity",id:"verbosity",children:[]},{value:"versionSuffix",id:"versionsuffix",children:[]},{value:"publishProfile",id:"publishprofile",children:[]},{value:"extraParameters",id:"extraparameters",children:[]}]}],c={toc:s};function p(e){var t=e.components,r=(0,i.Z)(e,l);return(0,o.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"nxdotnet-publish"},"NxDotnet Publish"),(0,o.kt)("p",null,"Publishes an app via the ",(0,o.kt)("inlineCode",{parentName:"p"},"dotnet")," cli command."),(0,o.kt)("h2",{id:"options"},"Options"),(0,o.kt)("h3",{id:"configuration"},"configuration"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"(string): Defines the build configuration The default for most projects is Debug, but you can override the build configuration settings in your project.")),(0,o.kt)("h3",{id:"framework"},"framework"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"(string): Publishes the application for the specified target framework. You must specify the target framework in the project file.")),(0,o.kt)("h3",{id:"force"},"force"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"(boolean): Forces all dependencies to be resolved even if the last restore was successful. Specifying this flag is the same as deleting the project.assets.json file.")),(0,o.kt)("h3",{id:"nobuild"},"noBuild"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"(boolean): Doesn","'","t build the project before publishing. It also implicitly sets the --no-restore flag.")),(0,o.kt)("h3",{id:"nodependencies"},"noDependencies"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"(boolean): Ignores project-to-project references and only restores the root project.")),(0,o.kt)("h3",{id:"nologo"},"nologo"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"(boolean): Doesn","'","t display the startup banner or the copyright message. Available since .NET Core 3.0 SDK.")),(0,o.kt)("h3",{id:"norestore"},"noRestore"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"(boolean): Doesn","'","t execute an implicit restore when running the command.")),(0,o.kt)("h3",{id:"output"},"output"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"(string): Specifies the path for the output directory.")),(0,o.kt)("h3",{id:"selfcontained"},"selfContained"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"(boolean): Publishes the .NET runtime with your application so the runtime doesn","'","t need to be installed on the target machine. Default is true if a runtime identifier is specified and the project is an executable project (not a library project).")),(0,o.kt)("h3",{id:"runtime"},"runtime"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"(string): Publishes the application for a given runtime.")),(0,o.kt)("h3",{id:"verbosity"},"verbosity"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"(string):")),(0,o.kt)("h3",{id:"versionsuffix"},"versionSuffix"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"(string): Defines the version suffix to replace the asterisk (","*",") in the version field of the project file.")),(0,o.kt)("h3",{id:"publishprofile"},"publishProfile"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"(string): Specifies the name of the publish profile to use while publishing. Do not include the file path or the file extension. MSBuild by default looks in the Properties/PublishProfiles folder and assumes the pubxml file extension.")),(0,o.kt)("h3",{id:"extraparameters"},"extraParameters"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"(string): Extra command-line arguments that are passed verbatim to the dotnet command.")))}p.isMDXComponent=!0}}]);