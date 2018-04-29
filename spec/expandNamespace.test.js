const proxyquire = require( 'proxyquire' );
const assert     = require( 'assert' );

describe( 'The ./lib/expandNamespaces function', ()=>{

  it( 'should keep paths without namespaces unchanged', ()=>{

    const expandNamespaces = proxyquire( '../lib/expandNamespace', {
      './loadNamespaces': sinon.stub()
    } );

    const expected = './somePath';
    const actual   = expandNamespaces( expected );

    expect( actual ).to.equal( expected );

  } );

  it.skip( 'start writing tests here', ()=>{

  } );

  let expandNS;

  beforeEach( ()=>{

    expandNS = proxyquire( '../lib/expandNamespace', {
      './loadNamespaces': ()=>( { namespaces: { module2: 'path/to' } } )
    } );

  } );

  it( 'should return any invalid modules passed as argument', ()=>{

    const invalidModule = '30004'; // no matches
    const actual        = expandNS( invalidModule );
    const expected      = invalidModule;

    expect( actual ).to.equal( expected );

  } );

  it( 'should raise an assertion error if the module is not loaded', ()=>{

    const modulePath   = '<module1>';
    const namespaceKey = 'module1';
    const { message }  = new assert.AssertionError(
      { message: `namespace <${ namespaceKey }> is not defined.` } );

    expect( ()=>expandNS( modulePath ) ).to.throw( message );

  } );

  it( 'should return a relative path that starts with .', ()=>{

    const actual   = expandNS( '<module2>', '/' ).charAt( 0 );
    const expected = '.';

    expect( actual ).to.equal( expected );

  } );

} );
