import React, { Component } from 'react'
import Terminal from "terminal-in-react";
import axios from "axios";
const API_URL = "https://api.github.com/graphql";

const token = "0f7d168720e04c2002bb73468c73edde564aa2ee";
export default class ReactTerminal extends Component {
    state = {
        api_response: [],
        a: false,
      };

      //   Function of Graphql Start

  github_graphql_search_query = (query) => {
    axios({
      url: API_URL,
      method: "post",
      headers: { Authorization: `Bearer ${token}` },
      data: {
        query: `{
               search(query: "${query}", type: REPOSITORY, first: 10) {
                 edges {
                   node {
                     ... on Repository {
                       name
                       homepageUrl
                     }
                   }
                 }
               }
           }`,
      },
    }).then((result) => {
      this.setState({
        api_response: result.data.data.search,
        a: true,
      });
    });
  };

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
          commands={{
            search: {
              method: (args, print, runCommand) => {
                var query = args._[0];
                this.github_graphql_search_query(query);
                print(`The search is for ${query}`);
                print(
                  <>
                    {this.state.a ? (
                      <div>
                        {this.state.api_response.edges.map((d, id) => (
                          <p key={id}>
                            <span style={{ color: "yellow" }}>
                              {d.node.name}{" "}
                              <span style={{ color: "blue" }}>
                                {d.node.homepageUrl}
                              </span>{" "}
                            </span>
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p>False</p>
                    )}
                  </>
                );
              },
            },
          }}
          descriptions={{
            search: "Search by Repo Name",
          }}
          msg="Type help to list the Commands"
        />
        {/* React Terminal End  */}
      </div>
        )
    }
}
