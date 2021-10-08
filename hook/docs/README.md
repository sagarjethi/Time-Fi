# Developer Notes

## TRACE

Richard Holland offered this regarding the use of i32/u32 being represented as a string value.

> The i32 is actually a pointer within the wasm memory to the start of the string.
> The string in this case is an array of uint16_t's because assembly script uses utf-16.
> Every buffer passed to a hook api is passed via a pair of i32s constituting a pointer
> (location in the wasm linear memory) and a length indicating where to find the end of
> that buffer.
>
> The trace functions in the hooks api detects utf16 if you send it and will down convert
> (in a lossy way) to ascii.
>
> This is why the length parameter is string.length \* 2, because the underlying buffer contains
> two bytes per character because it is a utf16 buffer.
>
> It should be noted the i32's are actually u32s (i.e. unsigned) but the hook api
> doesn't care for the purposes of export and it would never matter practically
> because a hook's memory is never allowed to be so large as to impinge on the sign bit.

**_Regarding mread_len:_**

According to the spec for the trace function passed in from the XRPL this arg should be nullable.
Currently AssemblyScript doesn't support nullable u32 values. The consequence of this is that the first 2 args passed to the trace function are mandatory in this lib (even though they are not mandatory from the context of the XRPL). There should be no problem if you make them an empty string with a length of 0.
