import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.Path;

@ApplicationPath("/rest")
public class RestApplication extends Application {
	private Set<Object> singletons = new HashSet<Object>();
    private Set<Class<?>> classes = new HashSet<Class<?>>();

    public RestApplication(){
		singletons.add(new FileResource());
	}
    
    @Override
    public Set<Class<?>> getClasses() {
        return classes;
    }
    
	@Override
	public Set<Object> getSingletons() {
		// TODO Auto-generated method stub
		return singletons;
	}

}
