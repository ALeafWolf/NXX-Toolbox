import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, ApolloLink } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import * as realm from './realm';

const uri = realm.graphqlUrl;
const apiKey = 'OhKQMwHcr5QsNa1SRwMV3UUACWXhfSM4qJaXA0fvTfKbICZ6Qr80QmHrlK7H8IId';


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
