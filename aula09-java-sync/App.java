import java.util.Arrays;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.io.IOException;

public class App {
    
    public static void main(String[] args) {
        if(args.length == 0) 
            throw new RuntimeException("You must provide the name of the files to read!");
            
        Arrays
            .stream(args)
            .forEach(filename -> {
                System.out.println("Reading " + filename);
                String lines = readAll(filename);
                System.out.println("##################################");
                System.out.println(lines);
            });
    }
    
    public static String readAll(String filename) {
        try{
            byte[] data = Files.readAllBytes(Paths.get(filename));
            return new String(data);
        } catch(IOException e) {
            throw new RuntimeException(e);
        }
    }
}
