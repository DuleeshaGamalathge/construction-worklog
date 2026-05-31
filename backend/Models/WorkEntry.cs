using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class WorkEntry
{
    public int Id { get; set; }

    [Required]
    public DateTime Date { get; set; }

    [Required]
    [MinLength(2)]
    public string WorkType { get; set; } = string.Empty;

    [Required]
    [Range(0.01, double.MaxValue)]
    public decimal Volume { get; set; }

    [Required]
    public string Unit { get; set; } = string.Empty;

    [Required]
    [MinLength(3)]
    public string Performer { get; set; } = string.Empty;
}