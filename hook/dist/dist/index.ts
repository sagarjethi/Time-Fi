/*
  Understanding what is happening here:
  @external decorator: The XRPL will export functions that your hook 
  can consume and use (like _g).
  
  declare: The declaration of each function here creates the contract 
  between your code and the compiler that essentially says, "I promise
  the XRPL will provide this function at runtime so don't throw a 
  compiler error."

  export: The export of these declarations make it possible for you to 
  use these in your hooks without needing to write each of them yourself.
*/

@external('env', '_g')
export declare function _g(
  id: i32,
  maxiter: i32
): void

// https://xrpl-hooks.readme.io/reference/trace
@external('env', 'trace')
export declare function trace(
  mread_prt: string | null,
  mread_len: u32,
  dread_prt: string | null,
  dread_len: u32,
  as_hex: u32
): i64 
