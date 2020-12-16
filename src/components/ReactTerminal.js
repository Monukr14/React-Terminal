import React, { Component } from "react";
import Terminal from "terminal-in-react";
import axios from "axios";
const API_URL = "https://api.github.com/graphql";

const token = "37fc15c9df3011de650d6a06ccd64d1527838581";
export default class ReactTerminal extends Component {
  state = {
    api_response: [],
    a: false,
  };

  //   Function of Graphql Start

  // github_graphql_search_query = (query) => {
  //   axios({
  //     url: API_URL,
  //     method: "post",
  //     headers: { Authorization: `Bearer ${token}` },
  //     data: {
  //       query: `{
  //              search(query: "${query}", type: REPOSITORY, first: 10) {
  //                edges {
  //                  node {
  //                    ... on Repository {
  //                      name
  //                      url
  //                    }
  //                  }
  //                }
  //              }
  //          }`,
  //     },
  //   }).then((result) => {
  //     this.setState({
  //       api_response: result.data.data.search,
  //       a: true,
  //     });
  //   });
  // };

  //  Function of Graphql End

  render() {
    console.log("api response data", this.state.api_response);
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* React - Terminal Start */}

        <Terminal
          color="red"
          backgroundColor="black"
          barColor="black"
          style={{ fontWeight: "bold", fontSize: "1em" }}
          commandPassThrough={(cmd, print) => {
            // do something async
            axios({
              url: API_URL,
              method: "post",
              headers: { Authorization: `Bearer ${token}` },
              data: {
                query: `{
                       search(query: "${cmd}", type: REPOSITORY, first: 10) {
                         edges {
                           node {
                             ... on Repository {
                               name
                               url
                             }
                           }
                         }
                       }
                   }`,
              },
            }).then((result) => {
              console.log("response data", result.data.data.search.edges);
              result.data.data.search.edges.map((d) => {
                return (
                  <>
                    {" "}
                    {print(`${d.node.name}  :   ${d.node.url}`)}
                    {/* {print(`${d.node.url}`)} */}
                  </>
                );
              });
            });
          }}
          // commands={{
          //   search: {
          //     method: (args, print, runCommand) => {
          //       var query = args._[0];
          //       this.github_graphql_search_query(query);
          //       // print(`The search is for ${query}`);
          //       print(
          //         <>
          //           {this.state.a ? (
          //             <div>
          //               {this.state.api_response.edges.map((d, id) => (
          //                 <p key={id}>
          //                   <span style={{ color: "yellow" }}>
          //                     {d.node.name}{" "}
          //                     <span style={{ color: "blue" }}>
          //                       {d.node.homepageUrl}
          //                     </span>{" "}
          //                   </span>
          //                 </p>
          //               ))}
          //             </div>
          //           ) : ""}
          //         </>
          //       );
          //     },
          //   },
          // }}
          descriptions={{
            search: "Search by Repo Name",
          }}
          msg="Type help to list the Commands"
        />
        {/* React Terminal End  */}
      </div>
    );
  }
}
