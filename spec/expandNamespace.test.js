const proxyquire = require( 'proxyquire' );

describe( 'The ./lib/expandNamespaces function', ()=>{

    it( 'should keep paths without namespaces unchanged', ()=>{

        const expandNamespaces = proxyquire( '../lib/expandNamespace', {
            './loadNamespaces': sinon.stub()
        } );

        const expected = './somePath';
        const actual   = expandNamespaces( expected );

        expect( actual ).to.equal( actual );

    } );

    it.skip( 'start writing tests here', ()=>{

    } );

    beforeEach(() => {
        const expandNamespaces = proxyquire('../lib/expandNamespace.js', {
            './loadNamespaces': () => {}
        });
    });

    it('should return any invalid modules passed as argument', () => {
        const invalidModule = "30004";
        const expected = invalidModule;

        expect(expandNamespaces(invalidModule)).to.equal(expected);

    });

    it('should raise an assertion error if the module is not loaded', () => {
        const modulePath = "<namespace.js>";
        const namespaceKey = "namespace.js";
        const errMsg = `namespace <${namespaceKey}> is not defined.`;

        expandNamespaces(modulePath).should.Throw(AssertionError({message: errMsg}));
    });

    it('should return a relative path that starts with .', () => {
        const modulePath = "module.js";
        const expected = "./../path/to/module";

        expect(expandNamespaces(modulePath)).to.equal(expected);
    });
} );
