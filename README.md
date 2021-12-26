Parse XML into JavaScript objects
=================================

`xml2js` utility ported to Deno from [xml-js](https://github.com/nashwaan/xml-js) library.

[saxes](https://github.com/lddubeau/saxes) (it's [version for Deno](https://deno.land/x/notranspile_saxes)) library is used to parse XML.

See [js2xml](https://deno.land/x/js2xml) to convert objects back to XML.

Usage example
-------------

```
import { xml2js } from "https://deno.land/x/xml2js@1.0.0/mod.ts";

const xml = `
<foo>
    <bar>41</bar>
    <baz boo="42">
        <baa><![CDATA[43]]></baa>
    </baz>
</foo>
`

const obj = xml2js(xml, {
  compact: true,
});

console.log(JSON.stringify(obj, null, 4));
```

Output:

```
{
    "foo": {
        "bar": {
            "_text": "41"
        },
        "baz": {
            "_attributes": {
                "boo": "42"
            },
            "baa": {
                "_cdata": "43"
            }
        }
    }
}
```

License information
-------------------

This project is released under the [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0).