import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import * as realm from './realm';

const uri = realm.graphqlUrl;


export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const link = httpLink.create({
    uri,
    headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
  });

  return {
    link: link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
