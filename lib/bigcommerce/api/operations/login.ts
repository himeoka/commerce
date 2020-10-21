import type {
  LoginMutation,
  LoginMutationVariables,
} from 'lib/bigcommerce/schema'
import type { RecursivePartial } from '../utils/types'
import { BigcommerceConfig, getConfig } from '..'

export const loginMutation = /* GraphQL */ `
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      result
    }
  }
`

export type LoginResult<T extends { result?: any } = { result?: string }> = T

export type LoginVariables = LoginMutationVariables

async function login(opts: {
  variables: LoginVariables
  config?: BigcommerceConfig
}): Promise<LoginResult>

async function login<T extends { result?: any }, V = any>(opts: {
  query: string
  variables: V
  config?: BigcommerceConfig
}): Promise<LoginResult<T>>

async function login({
  query = loginMutation,
  variables,
  config,
}: {
  query?: string
  variables: LoginVariables
  config?: BigcommerceConfig
}): Promise<LoginResult> {
  config = getConfig(config)

  const data = await config.fetch<RecursivePartial<LoginMutation>>(query, {
    variables,
  })

  return {
    result: data.login?.result,
  }
}

export default login