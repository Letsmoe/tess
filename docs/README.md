# Templating Engine
Allows you to compile any content inside a file with any installable language to something you want to.

The following are examples of what something will turn out to.
```
<p>{{ "hello" }}</p>
```

```
<p>hello</p>
```

## Variables
Using variables is very straightforward.
```
{{ const Greeting = "Hello, World!"; }}

<p>{{ Greeting }}</p>
```

```
<p>Hello, World!</p>
```

## Other Languages
```
{{#!/usr/bin/python
print("<p>Hello, World!</p>")
}}
```

```
<p>Hello, World!</p>
```

## Escaping
```
{\{ This is normal text inside two curlys }}
```

Placing a backslash somewhere in between the brackets will prevent it from being picked up by the compiler.

## Inline Code
```
{{ const x = {{#!/usr/bin/python print("Hello World!") }} }}

{{ x }}
```

```
Hello World!
```