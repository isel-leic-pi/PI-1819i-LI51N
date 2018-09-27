import java.util.Arrays;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.io.IOException;
import org.javaync.io.AsyncFiles;

public class App {
    
    public static void main(String[] args) throws Exception {
        if(args.length == 0) 
            throw new RuntimeException("You must provide the name of the files to read!");
            
        Arrays
            .stream(args)
            .forEach(filename -> {
                System.out.println("Reading " + filename);
                AsyncFiles
                    .readAll(filename, (err, data) -> {
                        String lines = new String(data);
                        System.out.println("##################################");
                        System.out.println(lines);
                    });
            });
        Thread.sleep(2000);
    }
}
