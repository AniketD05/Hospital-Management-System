

public class IdGenerator
{
    public static string GenerateNewId()
    {
        return Guid.NewGuid().ToString();
    }
}
