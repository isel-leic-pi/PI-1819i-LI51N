import java.util.Arrays;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.io.IOException;
import org.javaync.io.AsyncFiles;

public class App {
    
    public static void main(String[] args) {
        if(args.length == 0) 
            throw new RuntimeException("You must provide the name of the files to read!");
            
        Arrays
            .stream(args)
            .map(filename -> {
                System.out.println("Reading " + filename);
                return AsyncFiles
                    .readAll(filename)
                    .thenAccept( data -> {
                        String lines = new String(data);
                        System.out.println("##################################");
                        System.out.println(lines);
                    });
            })
            .skip(1)
            .findFirst()
            .ifPresent(res -> res.join());
    }
}
